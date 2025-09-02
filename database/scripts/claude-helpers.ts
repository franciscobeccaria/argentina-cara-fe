/**
 * Helper functions for Claude Code to manage Dashboard Argentina database
 * These functions provide convenient access to common database operations
 */

import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// Database Statistics and Overview
export async function getDatabaseStats() {
  console.log('📊 Dashboard Argentina - Database Statistics')
  console.log('=' .repeat(50))
  
  const stats = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.userContribution.count(),
    prisma.vote.count(),
    prisma.priceHistory.count(),
  ])
  
  console.log(`Products: ${stats[0]}`)
  console.log(`Categories: ${stats[1]}`)
  console.log(`User Contributions: ${stats[2]}`)
  console.log(`Votes: ${stats[3]}`)
  console.log(`Price History Records: ${stats[4]}`)
  
  return {
    products: stats[0],
    categories: stats[1],
    userContributions: stats[2],
    votes: stats[3],
    priceHistory: stats[4]
  }
}

// View all products with formatted output
export async function listAllProducts() {
  console.log('📦 All Products')
  console.log('=' .repeat(50))
  
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  })
  
  products.forEach(product => {
    const data = product.data as any
    console.log(`\n🏷️  ${product.productName}`)
    console.log(`   Brand: ${product.brand || 'N/A'}`)
    console.log(`   Category: ${product.category?.displayName || 'N/A'}`)
    console.log(`   AR Price: ${data.AR?.currency} ${data.AR?.value?.toLocaleString()}`)
    console.log(`   US Price: USD ${data.US?.value}`)
    console.log(`   Last Updated: ${product.updatedAt.toLocaleDateString()}`)
  })
  
  return products
}

// View products by category
export async function listProductsByCategory(categoryName: string) {
  console.log(`📦 Products in Category: ${categoryName}`)
  console.log('=' .repeat(50))
  
  const products = await prisma.product.findMany({
    where: {
      category: { name: categoryName }
    },
    include: { category: true },
    orderBy: { updatedAt: 'desc' }
  })
  
  if (products.length === 0) {
    console.log(`❌ No products found in category: ${categoryName}`)
    return []
  }
  
  products.forEach(product => {
    const data = product.data as any
    console.log(`\n🏷️  ${product.productName}`)
    console.log(`   AR: ${data.AR?.currency} ${data.AR?.value?.toLocaleString()}`)
    console.log(`   US: USD ${data.US?.value}`)
  })
  
  return products
}

// Calculate economic indices
export async function calculateEconomicIndex(dollarRate = 1250) {
  console.log('📈 Economic Index Calculation')
  console.log('=' .repeat(50))
  
  const products = await prisma.product.findMany({
    include: { category: true }
  })
  
  const analysis = products.map(product => {
    const data = product.data as any
    const priceArInUsd = data.AR?.value / dollarRate
    const priceUs = data.US?.value
    const difference = ((priceArInUsd - priceUs) / priceUs) * 100
    
    return {
      productName: product.productName,
      category: product.category?.displayName,
      priceArInUsd: priceArInUsd,
      priceUs: priceUs,
      differencePercent: difference,
      isMoreExpensive: difference > 0
    }
  })
  
  const generalIndex = analysis.reduce((sum, item) => sum + item.differencePercent, 0) / analysis.length
  
  console.log(`\n📊 General Index: ${generalIndex.toFixed(2)}%`)
  console.log(`💰 Dollar Rate Used: $${dollarRate}`)
  
  // Group by category
  const categoriesMap = new Map()
  analysis.forEach(item => {
    if (!item.category) return
    if (!categoriesMap.has(item.category)) {
      categoriesMap.set(item.category, [])
    }
    categoriesMap.get(item.category).push(item.differencePercent)
  })
  
  console.log('\n📋 By Category:')
  for (const [category, differences] of categoriesMap) {
    const categoryIndex = differences.reduce((a: number, b: number) => a + b, 0) / differences.length
    const status = categoryIndex > 0 ? '🔴 More Expensive' : '🟢 Cheaper'
    console.log(`   ${category}: ${categoryIndex.toFixed(2)}% ${status}`)
  }
  
  return {
    generalIndex,
    productAnalysis: analysis,
    categoryIndices: Object.fromEntries(categoriesMap)
  }
}

// Add a new product
export async function addProduct(productData: {
  productId: string
  productName: string
  brand?: string
  imageUrl?: string
  categoryName: string
  prices: {
    AR: { value: number, currency: string }
    US: { value: number }
  }
}) {
  console.log(`➕ Adding new product: ${productData.productName}`)
  
  // Find category
  const category = await prisma.category.findUnique({
    where: { name: productData.categoryName }
  })
  
  if (!category) {
    throw new Error(`Category '${productData.categoryName}' not found`)
  }
  
  const product = await prisma.product.create({
    data: {
      productId: productData.productId,
      productName: productData.productName,
      brand: productData.brand,
      imageUrl: productData.imageUrl,
      categoryId: category.id,
      data: productData.prices
    }
  })
  
  // Add to price history
  await prisma.priceHistory.create({
    data: {
      productId: productData.productId,
      prices: productData.prices,
      source: 'manual'
    }
  })
  
  console.log(`✅ Product added successfully: ${product.id}`)
  return product
}

// Update product prices
export async function updateProductPrices(productId: string, newPrices: {
  AR: { value: number, currency: string }
  US: { value: number }
}) {
  console.log(`🔄 Updating prices for product: ${productId}`)
  
  const product = await prisma.product.update({
    where: { productId },
    data: { 
      data: newPrices,
      updatedAt: new Date()
    }
  })
  
  // Add to price history
  await prisma.priceHistory.create({
    data: {
      productId,
      prices: newPrices,
      source: 'manual'
    }
  })
  
  console.log(`✅ Prices updated for: ${product.productName}`)
  return product
}

// View price history for a product
export async function viewPriceHistory(productId: string) {
  console.log(`📈 Price History for: ${productId}`)
  console.log('=' .repeat(50))
  
  const history = await prisma.priceHistory.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
    take: 10
  })
  
  history.forEach(entry => {
    const prices = entry.prices as any
    console.log(`\n📅 ${entry.createdAt.toLocaleDateString()}`)
    console.log(`   AR: ${prices.AR?.currency} ${prices.AR?.value?.toLocaleString()}`)
    console.log(`   US: USD ${prices.US?.value}`)
    console.log(`   Source: ${entry.source}`)
  })
  
  return history
}

// Quick database health check
export async function healthCheck() {
  console.log('🏥 Database Health Check')
  console.log('=' .repeat(50))
  
  try {
    // Test basic connectivity
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection: OK')
    
    // Check if we have data
    const productCount = await prisma.product.count()
    console.log(`✅ Products available: ${productCount}`)
    
    // Check categories
    const categoryCount = await prisma.category.count()
    console.log(`✅ Categories available: ${categoryCount}`)
    
    // Check recent activity
    const recentProduct = await prisma.product.findFirst({
      orderBy: { updatedAt: 'desc' }
    })
    console.log(`✅ Most recent update: ${recentProduct?.updatedAt.toLocaleString()}`)
    
    return { status: 'healthy', productCount, categoryCount }
    
  } catch (error) {
    console.log('❌ Database health check failed:', error)
    throw error
  }
}

// Export for direct usage
export async function runCommand(command: string, ...args: any[]) {
  try {
    switch (command) {
      case 'stats':
        return await getDatabaseStats()
      case 'list':
        return await listAllProducts()
      case 'list-category':
        return await listProductsByCategory(args[0])
      case 'index':
        return await calculateEconomicIndex(args[0])
      case 'add':
        return await addProduct(args[0])
      case 'update':
        return await updateProductPrices(args[0], args[1])
      case 'history':
        return await viewPriceHistory(args[0])
      case 'health':
        return await healthCheck()
      default:
        console.log('Available commands: stats, list, list-category, index, add, update, history, health')
    }
  } catch (error) {
    console.error('❌ Command failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// If run directly, execute command from args
if (require.main === module) {
  const [,, command, ...args] = process.argv
  if (command) {
    runCommand(command, ...args).catch(console.error)
  } else {
    console.log('Usage: tsx database/scripts/claude-helpers.ts <command> [args...]')
    console.log('Commands: stats, list, list-category <name>, index [rate], health')
  }
}