/**
 * Script to seed the database with sample data
 * This script creates sample products and categories for testing
 */

import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

const sampleProducts = [
  {
    productId: 'nike-air-force-1',
    productName: 'Nike Air Force 1',
    brand: 'Nike',
    imageUrl: 'https://example.com/nike-air-force-1.jpg',
    categoryId: 'fashion',
    data: {
      AR: { value: 199999, currency: 'ARS' },
      US: { value: 115, currency: 'USD' }
    }
  },
  {
    productId: 'iphone-15-pro',
    productName: 'iPhone 15 Pro',
    brand: 'Apple',
    imageUrl: 'https://example.com/iphone-15-pro.jpg',
    categoryId: 'tech',
    data: {
      AR: { value: 1499999, currency: 'ARS' },
      US: { value: 999, currency: 'USD' }
    }
  },
  {
    productId: 'macbook-air-m3',
    productName: 'MacBook Air M3',
    brand: 'Apple',
    imageUrl: 'https://example.com/macbook-air-m3.jpg',
    categoryId: 'tech',
    data: {
      AR: { value: 1799999, currency: 'ARS' },
      US: { value: 1199, currency: 'USD' }
    }
  },
  {
    productId: 'argentina-jersey-adidas',
    productName: 'Argentina Anniversary Jersey',
    brand: 'Adidas',
    imageUrl: 'https://example.com/argentina-jersey.jpg',
    categoryId: 'fashion',
    data: {
      AR: { value: 89999, currency: 'ARS' },
      US: { value: 90, currency: 'USD' }
    }
  }
]

async function createCategories() {
  console.log('📋 Creating categories...')
  
  const categories = [
    { name: 'tech', displayName: 'Tecnología', description: 'Productos tecnológicos', color: '#3B82F6', icon: 'laptop' },
    { name: 'fashion', displayName: 'Moda', description: 'Ropa y accesorios', color: '#EC4899', icon: 'shirt' },
    { name: 'food', displayName: 'Comida', description: 'Alimentos y bebidas', color: '#10B981', icon: 'coffee' },
    { name: 'home', displayName: 'Hogar', description: 'Artículos para el hogar', color: '#F59E0B', icon: 'home' },
    { name: 'cars', displayName: 'Automóviles', description: 'Vehículos y repuestos', color: '#EF4444', icon: 'car' },
    { name: 'other', displayName: 'Otros', description: 'Otros productos', color: '#6B7280', icon: 'package' },
  ]

  const createdCategories = new Map<string, string>()

  for (const category of categories) {
    const result = await prisma.category.upsert({
      where: { name: category.name },
      update: category,
      create: category,
    })
    createdCategories.set(category.name, result.id)
  }
  
  console.log(`✅ Created ${categories.length} categories`)
  return createdCategories
}

async function createSampleProducts(categories: Map<string, string>) {
  console.log('📦 Creating sample products...')
  
  for (const product of sampleProducts) {
    const categoryId = categories.get(product.categoryId)
    
    await prisma.product.upsert({
      where: { productId: product.productId },
      update: {
        productName: product.productName,
        brand: product.brand,
        imageUrl: product.imageUrl,
        categoryId: categoryId,
        data: product.data,
      },
      create: {
        productId: product.productId,
        productName: product.productName,
        brand: product.brand,
        imageUrl: product.imageUrl,
        categoryId: categoryId,
        data: product.data,
      }
    })
  }
  
  console.log(`✅ Created ${sampleProducts.length} sample products`)
}

async function createPriceHistory(categories: Map<string, string>) {
  console.log('📈 Creating price history...')
  
  for (const product of sampleProducts) {
    await prisma.priceHistory.create({
      data: {
        productId: product.productId,
        prices: product.data,
        source: 'scraping',
      }
    })
  }
  
  console.log(`✅ Created price history for ${sampleProducts.length} products`)
}

async function main() {
  try {
    console.log('🌱 Seeding database with sample data...')
    
    // Create categories
    const categories = await createCategories()
    
    // Create sample products
    await createSampleProducts(categories)
    
    // Create price history
    await createPriceHistory(categories)
    
    // Show summary
    const productCount = await prisma.product.count()
    const categoryCount = await prisma.category.count()
    const historyCount = await prisma.priceHistory.count()
    
    console.log('\n🎉 Seeding completed successfully!')
    console.log(`📊 Summary:`)
    console.log(`  Categories: ${categoryCount}`)
    console.log(`  Products: ${productCount}`)
    console.log(`  Price History: ${historyCount}`)
    
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run seeding if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Seeding script failed:', error)
    process.exit(1)
  })
}

export { main as seedSampleData }