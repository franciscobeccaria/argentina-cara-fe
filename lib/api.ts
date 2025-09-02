import { prisma } from "./prisma"
import { summaryKpis } from "./data"
import { triggerGitHubWorkflow } from "./github"
import { ProductType } from "./types"

const isBuild = process.env.NEXT_PHASE === "phase-production-build"

export async function fetchProducts(): Promise<ProductType[]> {
  try {
    console.log('🔍 Fetching products from PostgreSQL...')
    
    const products = await prisma.product.findMany({
      include: {
        category: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    // Transform Prisma products to ProductType format
    const transformedProducts: ProductType[] = products.map(product => {
      const data = product.data as any
      
      return {
        id: parseInt(product.id, 36), // Convert string ID to number for compatibility
        name: product.productName,
        priceArgentina: data.AR?.value || 0,
        priceArgentinaCurreny: data.AR?.currency || "ARS",
        priceUSA: data.US?.value || 0,
        image: product.imageUrl || undefined,
        lastUpdated: product.updatedAt.toISOString(),
        brand: product.brand || undefined,
        category: product.category?.name || undefined,
      }
    })

    console.log(`✅ Successfully fetched ${transformedProducts.length} products from PostgreSQL`)
    return transformedProducts
    
  } catch (error) {
    console.error("❌ Error fetching products from PostgreSQL:", error)
    throw error
  }
}

export async function fetchSummaryKpis() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(summaryKpis), 100)
  })
}

// Future: Fetch categories
export async function fetchCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true
      },
      orderBy: {
        displayName: 'asc'
      }
    })

    return categories.map(category => ({
      id: category.id,
      name: category.name,
      displayName: category.displayName,
      description: category.description,
      color: category.color,
      icon: category.icon,
      productCount: category.products.length
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Future: Fetch products by category
export async function fetchProductsByCategory(categoryName: string): Promise<ProductType[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          name: categoryName
        }
      },
      include: {
        category: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return products.map(product => {
      const data = product.data as any
      
      return {
        id: parseInt(product.id, 36),
        name: product.productName,
        priceArgentina: data.AR?.value || 0,
        priceArgentinaCurreny: data.AR?.currency || "ARS",
        priceUSA: data.US?.value || 0,
        image: product.imageUrl || undefined,
        lastUpdated: product.updatedAt.toISOString(),
        brand: product.brand || undefined,
        category: product.category?.name || undefined,
      }
    })
  } catch (error) {
    console.error(`Error fetching products for category ${categoryName}:`, error)
    throw error
  }
}
