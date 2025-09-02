/**
 * Migration script from Supabase to local PostgreSQL
 * This script exports all data from Supabase and imports it to PostgreSQL using Prisma
 */

import { PrismaClient } from '@/lib/generated/prisma'

interface SupabaseProduct {
  product_id: string
  product_name: string
  brand: string
  image_url: string
  category_id: string
  created_at: string
  data: {
    AR: {
      value: number
      currency: string
    }
    US: {
      value: number
    }
  }
}

const prisma = new PrismaClient()

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_KEY!

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_KEY environment variables are required')
  process.exit(1)
}

async function fetchSupabaseProducts(): Promise<SupabaseProduct[]> {
  const endpoint = `${SUPABASE_URL}/rest/v1/productos_ultimos_precios`
  
  console.log('📥 Fetching products from Supabase...')
  
  try {
    const response = await fetch(endpoint, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Error fetching from Supabase: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`✅ Successfully fetched ${data.length} products from Supabase`)
    return data
  } catch (error) {
    console.error('❌ Error fetching data from Supabase:', error)
    throw error
  }
}

async function createDefaultCategories() {
  console.log('📋 Creating default categories...')
  
  const categories = [
    { name: 'tech', displayName: 'Tecnología', description: 'Productos tecnológicos', color: '#3B82F6', icon: 'laptop' },
    { name: 'fashion', displayName: 'Moda', description: 'Ropa y accesorios', color: '#EC4899', icon: 'shirt' },
    { name: 'food', displayName: 'Comida', description: 'Alimentos y bebidas', color: '#10B981', icon: 'coffee' },
    { name: 'home', displayName: 'Hogar', description: 'Artículos para el hogar', color: '#F59E0B', icon: 'home' },
    { name: 'cars', displayName: 'Automóviles', description: 'Vehículos y repuestos', color: '#EF4444', icon: 'car' },
    { name: 'other', displayName: 'Otros', description: 'Otros productos', color: '#6B7280', icon: 'package' },
  ]

  for (const category of categories) {
    try {
      await prisma.category.upsert({
        where: { name: category.name },
        update: category,
        create: category,
      })
    } catch (error) {
      console.error(`Error creating category ${category.name}:`, error)
    }
  }
  
  console.log(`✅ Created ${categories.length} default categories`)
}

async function migratePricesToHistory(products: SupabaseProduct[]) {
  console.log('📈 Creating price history entries...')
  
  for (const product of products) {
    try {
      await prisma.priceHistory.create({
        data: {
          productId: product.product_id,
          prices: product.data,
          source: 'scraping',
          createdAt: new Date(product.created_at),
        }
      })
    } catch (error) {
      console.error(`Error creating price history for ${product.product_id}:`, error)
    }
  }
  
  console.log(`✅ Created price history for ${products.length} products`)
}

async function migrateProducts(products: SupabaseProduct[]) {
  console.log('📦 Migrating products to PostgreSQL...')
  
  // Get categories mapping
  const categories = await prisma.category.findMany()
  const categoryMap = new Map(categories.map(c => [c.name, c.id]))
  
  let migratedCount = 0
  let errorCount = 0
  
  for (const product of products) {
    try {
      // Map category_id to actual category
      const categoryId = categoryMap.get(product.category_id) || categoryMap.get('other')
      
      await prisma.product.create({
        data: {
          productId: product.product_id,
          productName: product.product_name,
          brand: product.brand,
          imageUrl: product.image_url,
          categoryId: categoryId,
          data: product.data,
          createdAt: new Date(product.created_at),
          updatedAt: new Date(product.created_at),
        }
      })
      
      migratedCount++
    } catch (error) {
      console.error(`Error migrating product ${product.product_id}:`, error)
      errorCount++
    }
  }
  
  console.log(`✅ Migration completed: ${migratedCount} products migrated, ${errorCount} errors`)
}

async function validateMigration(originalProducts: SupabaseProduct[]) {
  console.log('🔍 Validating migration...')
  
  const migratedCount = await prisma.product.count()
  const historyCount = await prisma.priceHistory.count()
  
  console.log(`Original products: ${originalProducts.length}`)
  console.log(`Migrated products: ${migratedCount}`)
  console.log(`Price history entries: ${historyCount}`)
  
  if (migratedCount === originalProducts.length) {
    console.log('✅ Migration validation successful: All products migrated')
    return true
  } else {
    console.log('❌ Migration validation failed: Product count mismatch')
    return false
  }
}

async function main() {
  try {
    console.log('🚀 Starting Supabase to PostgreSQL migration...')
    
    // Step 1: Fetch data from Supabase
    const supabaseProducts = await fetchSupabaseProducts()
    
    if (supabaseProducts.length === 0) {
      console.log('⚠️  No products found in Supabase. Migration completed.')
      return
    }
    
    // Step 2: Create default categories
    await createDefaultCategories()
    
    // Step 3: Migrate products
    await migrateProducts(supabaseProducts)
    
    // Step 4: Create price history
    await migratePricesToHistory(supabaseProducts)
    
    // Step 5: Validate migration
    const isValid = await validateMigration(supabaseProducts)
    
    if (isValid) {
      console.log('🎉 Migration completed successfully!')
      console.log('💡 Next steps:')
      console.log('  1. Test the application with the new database')
      console.log('  2. Update API endpoints to use Prisma')
      console.log('  3. Remove Supabase dependencies')
    } else {
      console.log('❌ Migration completed with errors. Please review the logs.')
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run migration if called directly
if (require.main === module) {
  main().catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
}

export { main as runMigration }