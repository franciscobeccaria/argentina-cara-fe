export interface ProductType {
  id: number
  name: string
  priceARS: number
  priceUSDBlue: number
  priceUSA: number
  priceDifferencePercentage: number
  image?: string
  lastUpdated: string // Added lastUpdated field
}

export interface SummaryKpiType {
  title: string
  value: string
  description: string
  icon: "dollar" | "shopping" | "trending" | "coffee" | "percentage" | "briefcase"
}
