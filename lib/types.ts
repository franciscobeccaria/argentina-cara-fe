export interface PriceSource {
  url?: string
  storeName: string
  logoUrl?: string
  verified: boolean
}

export interface ProductType {
  id: number
  name: string
  priceArgentina: number
  priceArgentinaCurreny: "USD" | "ARS"
  priceUSA: number
  priceChile?: number
  priceBrazil?: number
  priceEurope?: number
  image?: string
  lastUpdated: string
  brand?: string
  category?: string
  location?: string
  description?: string
  methodology?: string
  sources?: {
    argentina?: PriceSource
    usa?: PriceSource
    chile?: PriceSource
    brazil?: PriceSource
    europe?: PriceSource
  }
}

export interface SummaryKpiType {
  title: string
  value: string
  description: string
  icon: "dollar" | "shopping" | "trending" | "coffee" | "percentage" | "briefcase"
}

export interface ComparisonMessageType {
  id: number
  title: string
  message: string
  argentinaDifference: string
  comparison: "usa" | "chile" | "brazil" | "europe"
  category: "food" | "services" | "retail" | "technology" | "lifestyle"
}

export interface CommonQuestionType {
  id: number
  question: string
  answer: string
  category: "shopping" | "travel" | "housing" | "lifestyle"
  comparison?: string
}

export interface ContactSubmissionType {
  name: string
  email: string
  productName: string
  message: string
  location: string
}
