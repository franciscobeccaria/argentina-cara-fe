export interface ProductType {
  id: number
  name: string
  priceArgentina: number
  priceArgentinaCurreny: "USD" | "ARS"
  priceUSA: number
  image?: string
  lastUpdated: string
  brand?: string
  category?: string
}

export interface SummaryKpiType {
  title: string
  value: string
  description: string
  icon: "dollar" | "shopping" | "trending" | "coffee" | "percentage" | "briefcase"
}
