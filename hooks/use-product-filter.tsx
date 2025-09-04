"use client"

import { useState, useMemo } from "react"
import type { ProductType, CategoryType } from "@/lib/types"

interface UseProductFilterProps {
  products: ProductType[]
}

export function useProductFilter({ products }: UseProductFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "all">("all")
  const [showOnlyVerified, setShowOnlyVerified] = useState(false)
  const [sortBy, setSortBy] = useState<"name" | "price_diff" | "votes" | "date">("name")

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.categoryType === selectedCategory)
    }

    // Filter by verification status
    if (showOnlyVerified) {
      filtered = filtered.filter(product => 
        product.dataSource === "verified" || 
        product.dataSource === "scraped" ||
        product.verificationStatus === "approved"
      )
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price_diff":
          const aDiff = ((a.priceArgentina / (a.priceArgentinaCurreny === "USD" ? 1 : 1200)) - a.priceUSA) / a.priceUSA * 100
          const bDiff = ((b.priceArgentina / (b.priceArgentinaCurreny === "USD" ? 1 : 1200)) - b.priceUSA) / b.priceUSA * 100
          return bDiff - aDiff // Higher difference first
        case "votes":
          const aVotes = a.votes.up - a.votes.down
          const bVotes = b.votes.up - b.votes.down
          return bVotes - aVotes // Higher net votes first
        case "date":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [products, selectedCategory, showOnlyVerified, sortBy])

  const categoryStats = useMemo(() => {
    const stats = {
      total: products.length,
      byCategory: {} as Record<CategoryType, number>,
      verified: products.filter(p => 
        p.dataSource === "verified" || 
        p.dataSource === "scraped" ||
        p.verificationStatus === "approved"
      ).length,
      pending: products.filter(p => 
        p.dataSource === "user_contributed" && 
        p.verificationStatus === "pending"
      ).length,
    }

    products.forEach(product => {
      stats.byCategory[product.categoryType] = (stats.byCategory[product.categoryType] || 0) + 1
    })

    return stats
  }, [products])

  return {
    selectedCategory,
    setSelectedCategory,
    showOnlyVerified,
    setShowOnlyVerified,
    sortBy,
    setSortBy,
    filteredProducts,
    categoryStats,
  }
}