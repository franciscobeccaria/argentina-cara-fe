import { fetchProducts, fetchSummaryKpis } from "@/lib/api"
import DashboardPage from "@/components/dashboard-page"
import type { ProductType, SummaryKpiType } from "@/lib/types"

export default async function HomePage() {
  const products: ProductType[] = await fetchProducts()
  const summaryKpis: SummaryKpiType[] = await fetchSummaryKpis()

  return <DashboardPage products={products} summaryKpis={summaryKpis} />
}
