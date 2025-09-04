export type DataSource = "scraped" | "manual" | "user_contributed" | "verified"
export type CategoryType = "tech" | "food" | "fashion" | "home" | "cars" | "other"

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
  // New fields for enhanced functionality
  dataSource: DataSource
  categoryType: CategoryType
  sourceUrl?: string
  votes: {
    up: number
    down: number
    userVote?: "up" | "down" | null
  }
  contributorName?: string
  verificationStatus?: "pending" | "approved" | "rejected"
}

export interface SummaryKpiType {
  title: string
  value: string
  description: string
  icon: "dollar" | "shopping" | "trending" | "coffee" | "percentage" | "briefcase"
}

export interface CategoryIndex {
  category: CategoryType
  name: string
  index: number
  trend: "up" | "down" | "stable"
  color: "green" | "yellow" | "red"
  productCount: number
}

export interface ContributionType {
  id: number
  productName: string
  priceArgentina: number
  priceArgentinaCurrency: "USD" | "ARS"
  priceUSA: number
  category: CategoryType
  sourceUrl?: string
  contributorName?: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  votes: {
    up: number
    down: number
  }
  adminNotes?: string
}
