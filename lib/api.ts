import { mapSupabaseProductsToProductType } from "./adapters/mapSupabaseProductsToProductType"
import { summaryKpis, products } from "./data"
import { triggerGitHubWorkflow } from "./github"
import type { ProductType, SummaryKpiType } from "./types"

const isBuild = process.env.NEXT_PHASE === "phase-production-build"

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_KEY!

export async function fetchProducts(): Promise<ProductType[]> {
  // Use mock data for now to test new features
  // Fallback to Supabase if needed
  if (process.env.USE_MOCK_DATA === "true" || !SUPABASE_URL) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 100)
    })
  }

  const endpoint = `${SUPABASE_URL}/rest/v1/productos_ultimos_precios`

  try {
    const res = await fetch(endpoint, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      ...(isBuild
        ? { next: { revalidate: 1 } }
        : { next: { revalidate: 86400 } }),
    })

    if (!res.ok) {
      const errorBody = await res.text()
      console.error(`Error getting products: ${res.status} ${res.statusText}`, errorBody)
      // Fallback to mock data if Supabase fails
      console.log("Falling back to mock data")
      return products
    }

    const rawData = await res.json()
    return mapSupabaseProductsToProductType(rawData)
  } catch (error) {
    console.error("Error fetchProducts:", error)
    // Fallback to mock data if there's an error
    console.log("Falling back to mock data due to error")
    return products
  }
}

export async function fetchSummaryKpis(): Promise<SummaryKpiType[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(summaryKpis), 100)
  })
}
