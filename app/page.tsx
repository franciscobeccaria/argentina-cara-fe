import { fetchProducts, fetchSummaryKpis } from "@/lib/api"
import DashboardPage from "@/components/dashboard-page"

export default async function HomePage() {
  const products = await fetchProducts()
  const summaryKpis = await fetchSummaryKpis()

  return <DashboardPage products={products} summaryKpis={summaryKpis} />
}
