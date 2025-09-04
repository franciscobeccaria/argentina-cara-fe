type RawProduct = {
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

import type { ProductType as NewProductType, DataSource, CategoryType } from "../types"

export type ProductType = {
  id: string
  name: string
  priceArgentina: number
  priceArgentinaCurreny: string
  priceUSA: number
  image: string
  lastUpdated: string
  brand: string
  category: string
}

const mapCategoryToType = (category: string): CategoryType => {
  const categoryMap: Record<string, CategoryType> = {
    'tecnologia': 'tech',
    'ropa': 'fashion', 
    'gastronomia': 'food',
    'hogar': 'home',
    'autos': 'cars',
  }
  return categoryMap[category] || 'other'
}

export function mapSupabaseProductsToProductType(data: RawProduct[]): NewProductType[] {
  return data.map((item) => ({
    id: parseInt(item.product_id),
    name: item.product_name,
    priceArgentina: item.data.AR.value,
    priceArgentinaCurreny: item.data.AR.currency as "USD" | "ARS",
    priceUSA: item.data.US.value,
    image: item.image_url,
    lastUpdated: item.created_at,
    brand: item.brand,
    category: item.category_id,
    // New required fields
    dataSource: "scraped" as DataSource,
    categoryType: mapCategoryToType(item.category_id),
    votes: {
      up: 0,
      down: 0,
      userVote: null,
    },
    sourceUrl: undefined,
  }))
}
