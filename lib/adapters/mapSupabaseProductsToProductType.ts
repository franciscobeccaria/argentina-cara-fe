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

export function mapSupabaseProductsToProductType(data: RawProduct[]): ProductType[] {
  return data.map((item) => ({
    id: item.product_id,
    name: item.product_name,
    priceArgentina: item.data.AR.value,
    priceArgentinaCurreny: item.data.AR.currency,
    priceUSA: item.data.US.value,
    image: item.image_url,
    lastUpdated: item.created_at,
    brand: item.brand,
    category: item.category_id,
  }))
}
