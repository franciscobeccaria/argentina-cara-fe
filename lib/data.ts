import type { ProductType, SummaryKpiType } from "./types"

// Mock data for products
export const products: ProductType[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    priceARS: 3900000,
    priceUSDBlue: 3900,
    priceUSA: 1500,
    priceDifferencePercentage: 160,
    image: "/placeholder.svg?height=160&width=320",
    lastUpdated: "2024-04-15",
  },
  {
    id: 2,
    name: "Nike Air Max",
    priceARS: 250000,
    priceUSDBlue: 250,
    priceUSA: 180,
    priceDifferencePercentage: 39,
    image: "/placeholder.svg?height=160&width=320",
    lastUpdated: "2024-04-12",
  },
  {
    id: 3,
    name: "Café Starbucks 250g",
    priceARS: 15000,
    priceUSDBlue: 15,
    priceUSA: 18,
    priceDifferencePercentage: -17,
    image: "/placeholder.svg?height=160&width=320",
    lastUpdated: "2024-04-14",
  },
  {
    id: 4,
    name: "MacBook Air M2",
    priceARS: 4500000,
    priceUSDBlue: 4500,
    priceUSA: 1299,
    priceDifferencePercentage: 246,
    image: "/placeholder.svg?height=160&width=320",
    lastUpdated: "2024-04-10",
  },
]

// Mock data for summary KPIs
export const summaryKpis: SummaryKpiType[] = [
  {
    title: "Inflación percibida mensual",
    value: "12.8%",
    description: "Basada en variación de productos analizados",
    icon: "trending",
  },
  {
    title: "Cotización Dólar Blue",
    value: "$1,000",
    description: "+5.2% vs mes anterior",
    icon: "dollar",
  },
  {
    title: "Brecha cambiaria",
    value: "15%",
    description: "Diferencia entre oficial y blue",
    icon: "percentage",
  },
  {
    title: "Comparativa de ingresos",
    value: "10x",
    description: "Sueldo EE.UU. vs Argentina en USD",
    icon: "briefcase",
  },
]
