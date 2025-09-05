import { notFound } from "next/navigation"
import { fetchProducts, fetchSummaryKpis } from "@/lib/api"
import CategoryPage from "@/components/category-page"
import type { ProductType, SummaryKpiType, CategoryType } from "@/lib/types"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Map URL slugs to category types
const categoryMap: Record<string, { type: CategoryType; name: string; description: string }> = {
  "tecnologia": {
    type: "tech",
    name: "Tecnología",
    description: "Compará precios de productos tecnológicos entre Argentina y el mundo"
  },
  "gastronomia": {
    type: "food", 
    name: "Gastronomía",
    description: "Descubrí cuánto cuestan cafés, restaurantes y supermercado vs otros países"
  },
  "moda": {
    type: "fashion",
    name: "Moda y Ropa",
    description: "Zapatillas, remeras y ropa: ¿conviene comprar en Argentina o afuera?"
  },
  "hogar": {
    type: "home",
    name: "Hogar",
    description: "Productos para el hogar y decoración: compará precios internacionales"
  },
  "autos": {
    type: "cars",
    name: "Autos",
    description: "Vehículos y accesorios: ¿Argentina vs el mundo?"
  },
  "otros": {
    type: "other",
    name: "Otros",
    description: "Productos diversos y comparaciones especiales"
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryInfo = categoryMap[params.slug]
  
  if (!categoryInfo) {
    return {
      title: "Categoría no encontrada"
    }
  }

  return {
    title: `${categoryInfo.name} - ¿Somos el País Más Caro del Mundo?`,
    description: categoryInfo.description,
    openGraph: {
      title: `Precios de ${categoryInfo.name} en Argentina vs el Mundo`,
      description: categoryInfo.description,
    }
  }
}

export default async function CategoryPageRoute({ params }: CategoryPageProps) {
  const categoryInfo = categoryMap[params.slug]
  
  if (!categoryInfo) {
    notFound()
  }

  const allProducts: ProductType[] = await fetchProducts()
  const summaryKpis: SummaryKpiType[] = await fetchSummaryKpis()
  
  // Filter products by category
  const categoryProducts = allProducts.filter(
    product => product.categoryType === categoryInfo.type
  )

  return (
    <CategoryPage 
      products={categoryProducts}
      summaryKpis={summaryKpis}
      category={categoryInfo}
      slug={params.slug}
    />
  )
}