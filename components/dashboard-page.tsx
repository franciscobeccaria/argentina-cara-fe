"use client"

import { useState } from "react"
import { useDollar } from "@/lib/context/dollar-context"
import { DollarSign, ShoppingBag, TrendingUp, Coffee, Briefcase, Percent, Settings, Shield } from "lucide-react"
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
  const [showPowerUserHint, setShowPowerUserHint] = useState(false)
  const [userInteractions, setUserInteractions] = useState(0)
  
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
    
    // Track user interactions for power user features
    setUserInteractions(prev => {
      const newCount = prev + 1
      if (newCount >= 3 && !showPowerUserHint) {
        setTimeout(() => setShowPowerUserHint(true), 1000)
      }
      return newCount
    })
    
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
        {/* Header - Clean and focused */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">¿Argentina está cara en dólares?</h1>
          <p className="mt-2 text-muted-foreground">
            Un índice dinámico que compara precios entre Argentina y EE.UU.
          </p>
          
          {/* Admin access - Hidden by default, revealed on triple click */}
          <div 
            className="absolute top-4 right-4 opacity-0 hover:opacity-30 transition-opacity"
            onClick={(e) => {
              if (e.detail === 3) { // Triple click
                setIsAdminMode(!isAdminMode)
              }
            }}
          >
            <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Admin Panel - Only shown when admin mode is active */}
        {isAdminMode && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-700 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Panel de Administración Activado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                    <Shield className="h-4 w-4 mr-2" />
                    Abrir Panel Admin
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
            </CardContent>
          </Card>
        )}

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
          onCategoryChange={(category) => {
            setSelectedCategory(category)
            // Track interaction
            setUserInteractions(prev => prev + 1)
          }}
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
            <p className="text-sm mb-4">Prueba seleccionando otra categoría</p>
            {/* Contextual contribution CTA when category is empty */}
            <ContributionModal onSubmit={handleContribution} />
          </div>
        )}

        {/* Subtle contribution CTA after user has seen products */}
        {productsWithVotes.length > 0 && (
          <Card className="mb-8 border-dashed border-gray-300 bg-gray-50/50">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                ¿Conocés algún producto que no esté en el índice?
              </p>
              <ContributionModal onSubmit={handleContribution} variant="subtle" />
              <p className="text-xs text-muted-foreground mt-2">
                Ayudá a mejorar el índice con tu experiencia local
              </p>
            </CardContent>
          </Card>
        )}

        {/* Power user hint - appears after engagement */}
        {showPowerUserHint && !isAdminMode && (
          <Card className="mb-6 border-blue-200 bg-blue-50 animate-fade-in">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">
                    💡 <strong>Tip:</strong> Triple-click en la esquina superior derecha para acceder a funciones avanzadas
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowPowerUserHint(false)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  ✕
                </Button>
              </div>
            </CardContent>
          </Card>
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
