import { products, summaryKpis } from "./data"

export async function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 100)
  })
}

export async function fetchSummaryKpis() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(summaryKpis), 100)
  })
}
