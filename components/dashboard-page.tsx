"use client"

import { useDollar } from "@/lib/context/dollar-context"
import { DollarSign, ShoppingBag, TrendingUp, Coffee, Briefcase, Percent } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProductCard from "@/components/product-card"
import DollarSelector from "@/components/dollar-selector"

export default function DashboardPage({ products, summaryKpis }) {
  const { getCurrentDollarValue } = useDollar()

  const avgPriceDiffPercentage = products.reduce((acc, product) => {
    const isPriceInUSD = product.priceArgentinaCurreny === "USD"
    const dollarValue = getCurrentDollarValue()
    const priceInUSD = isPriceInUSD ? product.priceArgentina : product.priceArgentina / dollarValue
    const priceInARS = isPriceInUSD ? product.priceArgentina * dollarValue : product.priceArgentina
    const priceDiff = priceInUSD - product.priceUSA
    const percentageDiff = (priceDiff / product.priceUSA) * 100
    return acc + percentageDiff
  }, 0) / products.length

  const formattedAvgPriceDiffPercentage = avgPriceDiffPercentage.toFixed(2)
  const isMoreExpensive = avgPriceDiffPercentage > 0
  const statusText = isMoreExpensive
    ? `Argentina está más cara en promedio`
    : `Argentina está más barata en promedio`

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">¿Argentina está cara en dólares?</h1>
          <p className="mt-2 text-muted-foreground">
            Un índice visual de productos reconocidos que compara precios entre Argentina y EE.UU.
          </p>
        </div>

        {/* Main KPI Card */}
        <Card className={`mx-auto mb-8 max-w-md ${isMoreExpensive ? "bg-red-50" : "bg-green-50"}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Índice de Valor Relativo</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-5xl font-bold mb-2 ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>
              {formattedAvgPriceDiffPercentage}%
            </div>
            <p className={`text-sm ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>{statusText}</p>
          </CardContent>
        </Card>

        <DollarSelector />

        {/* Product Cards Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Summary KPIs Section */}
        <div className="mt-12 mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Indicadores Económicos Clave</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryKpis.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  {kpi.icon === "dollar" && <DollarSign className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "shopping" && <ShoppingBag className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "trending" && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "coffee" && <Coffee className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "percentage" && <Percent className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "briefcase" && <Briefcase className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
