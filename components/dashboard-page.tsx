"use client"

import { useState } from "react"
import { useDollar } from "@/lib/context/dollar-context"
import { DollarSign, ShoppingBag, TrendingUp, Coffee, Briefcase, Percent, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ProductCard from "@/components/product-card"
import DollarSelector from "@/components/dollar-selector"
import CategoryFilter from "@/components/category-filter"
import ContributionModal from "@/components/contribution-modal"
import AdminPanel from "@/components/admin-panel"
import { useProductFilter } from "@/hooks/use-product-filter"
import type { CategoryType, ProductType, SummaryKpiType } from "@/lib/types"

interface DashboardPageProps {
  products: ProductType[]
  summaryKpis: SummaryKpiType[]
}

export default function DashboardPage({ products, summaryKpis }: DashboardPageProps) {
  const { getCurrentDollarValue } = useDollar()
  const [userVotes, setUserVotes] = useState<Record<number, "up" | "down" | null>>({})
  const [isAdminMode, setIsAdminMode] = useState(false)
  
  const {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  } = useProductFilter({ products })

  // Update products with user votes
  const productsWithVotes = filteredProducts.map(product => ({
    ...product,
    votes: {
      ...product.votes,
      userVote: userVotes[product.id] || null,
    }
  }))

  const avgPriceDiffPercentage = productsWithVotes.reduce((acc, product) => {
    const isPriceInUSD = product.priceArgentinaCurreny === "USD"
    const dollarValue = getCurrentDollarValue()
    const priceInUSD = isPriceInUSD ? product.priceArgentina : product.priceArgentina / dollarValue
    const priceInARS = isPriceInUSD ? product.priceArgentina * dollarValue : product.priceArgentina
    const priceDiff = priceInUSD - product.priceUSA
    const percentageDiff = (priceDiff / product.priceUSA) * 100
    return acc + percentageDiff
  }, 0) / (productsWithVotes.length || 1)

  const formattedAvgPriceDiffPercentage = avgPriceDiffPercentage.toFixed(2)
  const isMoreExpensive = avgPriceDiffPercentage > 0
  const statusText = isMoreExpensive
    ? `Argentina está más cara en promedio`
    : `Argentina está más barata en promedio`

  const handleVote = (productId: number, voteType: "up" | "down") => {
    setUserVotes(prev => ({
      ...prev,
      [productId]: prev[productId] === voteType ? null : voteType
    }))
    // Here you would typically make an API call to record the vote
    console.log(`Voted ${voteType} on product ${productId}`)
  }

  const handleContribution = (contribution: any) => {
    // Here you would typically make an API call to submit the contribution
    console.log("New contribution:", contribution)
    alert("¡Gracias por tu contribución! Será revisada por la comunidad.")
  }

  const handleAdminAction = (contributionId: number, action: "approve" | "reject") => {
    // Here you would typically make an API call to handle admin actions
    console.log(`Admin ${action} for contribution ${contributionId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">¿Argentina está cara en dólares?</h1>
              <p className="mt-2 text-muted-foreground">
                Un índice dinámico con contribuciones de la comunidad
              </p>
            </div>
            <div className="flex gap-2">
              <ContributionModal onSubmit={handleContribution} />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Panel de Administración</DialogTitle>
                  </DialogHeader>
                  <AdminPanel 
                    onApprove={(id) => handleAdminAction(id, "approve")}
                    onReject={(id) => handleAdminAction(id, "reject")}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Main KPI Card */}
        <Card className={`mx-auto mb-8 max-w-md ${isMoreExpensive ? "bg-red-50" : "bg-green-50"}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              Índice de Valor Relativo
              {selectedCategory !== "all" && (
                <div className="text-sm text-muted-foreground font-normal mt-1">
                  Categoría: {selectedCategory}
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className={`text-5xl font-bold mb-2 ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>
              {formattedAvgPriceDiffPercentage}%
            </div>
            <p className={`text-sm ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>{statusText}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Basado en {productsWithVotes.length} producto(s)
            </p>
          </CardContent>
        </Card>

        <DollarSelector />

        {/* Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Product Cards Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productsWithVotes.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onVote={handleVote}
            />
          ))}
        </div>

        {productsWithVotes.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No hay productos en esta categoría</p>
            <p className="text-sm">Prueba seleccionando otra categoría o contribuye con un nuevo producto</p>
          </div>
        )}

        {/* Summary KPIs Section */}
        <div className="mt-12 mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Indicadores Económicos Clave</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {summaryKpis.map((kpi: SummaryKpiType, index: number) => (
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
