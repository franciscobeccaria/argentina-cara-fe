// Core Product Types
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
  source?: 'scraping' | 'manual' | 'user_contribution'
  isVerified?: boolean
  votes?: {
    useful: number
    notUseful: number
  }
}

export interface SummaryKpiType {
  title: string
  value: string
  description: string
  icon: "dollar" | "shopping" | "trending" | "coffee" | "percentage" | "briefcase"
}

// New Types for Future User Stories
export interface CategoryType {
  id: string
  name: string
  displayName: string
  description?: string
  color?: string
  icon?: string
  productCount?: number
  avgPriceDifference?: number
}

export interface UserContributionType {
  id: string
  productName: string
  brand?: string
  prices: {
    [countryCode: string]: {
      value: number
      currency: string
    }
  }
  categoryId: string
  sourceUrl?: string
  sourceProof?: string
  status: 'PENDING' | 'VERIFIED' | 'REJECTED'
  createdAt: string
  votes?: {
    useful: number
    notUseful: number
  }
}

export interface VoteType {
  id: string
  voteType: 'USEFUL' | 'NOT_USEFUL'
  fingerprint: string
  createdAt: string
}

export interface CategoryIndexType {
  category: CategoryType
  index: number
  trend: 'up' | 'down' | 'stable'
  products: ProductType[]
  avgPriceDifference: number
  isAdvantage: boolean
}

// API Response Types
export interface ProductsResponse {
  products: ProductType[]
  categories: CategoryType[]
  totalCount: number
}

export interface CategoryIndexResponse {
  generalIndex: number
  categoryIndices: CategoryIndexType[]
  lastUpdated: string
}
