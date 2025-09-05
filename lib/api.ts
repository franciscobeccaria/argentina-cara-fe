import { products, summaryKpis } from "./data"

export async function fetchProducts() {
  // Using mock data for UI/UX iteration phase
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 100)
  })
}

export async function fetchSummaryKpis() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(summaryKpis), 100)
  })
}
