import { mapSupabaseProductsToProductType } from "./adapters/mapSupabaseProductsToProductType"
import { summaryKpis } from "./data"
import { triggerGitHubWorkflow } from "./github"

const isBuild = process.env.NEXT_PHASE === "phase-production-build"

const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_KEY = process.env.SUPABASE_KEY!

export async function fetchProducts() {
  const endpoint = `${SUPABASE_URL}/rest/v1/productos_ultimos_precios`

  try {
    if (process.env.TRIGGER_GITHUB === "true")
      await triggerGitHubWorkflow()

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
      throw new Error(`Error getting products`)
    }

    const rawData = await res.json()
    return mapSupabaseProductsToProductType(rawData)
  } catch (error) {
    console.error("Error fetchProducts:", error)
    throw error
  }
}

export async function fetchSummaryKpis() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(summaryKpis), 100)
  })
}
