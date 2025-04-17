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
    description: "+2.3% vs mes anterior",
    icon: "trending",
  },
  {
    title: "Precio promedio en USD Blue",
    value: "$2,166",
    description: "Promedio de productos analizados",
    icon: "dollar",
  },
  {
    title: "Índice Tech & Moda",
    value: "203%",
    description: "Tecnología y moda son más caras",
    icon: "shopping",
  },
  {
    title: "Índice Consumo Diario",
    value: "92%",
    description: "Alimentos y bebidas son más baratos",
    icon: "coffee",
  },
]
