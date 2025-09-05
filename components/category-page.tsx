"use client"

import { useState } from "react"
import Link from "next/link"
import { useDollar } from "@/lib/context/dollar-context"
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Coffee, 
  Briefcase, 
  Percent, 
  Settings, 
  Shield,
  ChevronRight,
  Home,
  Filter,
  SortAsc,
  Grid,
  List
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ProductCard from "@/components/product-card"
import DollarSelector from "@/components/dollar-selector"
import ContributionModal from "@/components/contribution-modal"
import AdminPanel from "@/components/admin-panel"
import ProductDetailModal from "@/components/product-detail-modal"
import type { CategoryType, ProductType, SummaryKpiType } from "@/lib/types"

interface CategoryInfo {
  type: CategoryType
  name: string
  description: string
}

interface CategoryPageProps {
  products: ProductType[]
  summaryKpis: SummaryKpiType[]
  category: CategoryInfo
  slug: string
}

type SortOption = "name" | "price_diff" | "price_low" | "price_high" | "date" | "votes"
type ViewMode = "grid" | "list"

export default function CategoryPage({ products, summaryKpis, category, slug }: CategoryPageProps) {
  const { getCurrentDollarValue } = useDollar()
  const [userVotes, setUserVotes] = useState<Record<number, "up" | "down" | null>>({})
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("price_diff")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  // Update products with user votes
  const productsWithVotes = products.map(product => ({
    ...product,
    votes: {
      ...product.votes,
      userVote: userVotes[product.id] || null,
    }
  }))

  // Sort products based on selected option
  const sortedProducts = [...productsWithVotes].sort((a, b) => {
    const dollarValue = getCurrentDollarValue()
    
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "price_diff":
        const aDiff = ((a.priceArgentinaCurreny === "USD" ? a.priceArgentina : a.priceArgentina / dollarValue) - a.priceUSA) / a.priceUSA * 100
        const bDiff = ((b.priceArgentinaCurreny === "USD" ? b.priceArgentina : b.priceArgentina / dollarValue) - b.priceUSA) / b.priceUSA * 100
        return bDiff - aDiff // Higher difference first
      case "price_low":
        const aPriceUSD = a.priceArgentinaCurreny === "USD" ? a.priceArgentina : a.priceArgentina / dollarValue
        const bPriceUSD = b.priceArgentinaCurreny === "USD" ? b.priceArgentina : b.priceArgentina / dollarValue
        return aPriceUSD - bPriceUSD
      case "price_high":
        const aPriceUSD2 = a.priceArgentinaCurreny === "USD" ? a.priceArgentina : a.priceArgentina / dollarValue
        const bPriceUSD2 = b.priceArgentinaCurreny === "USD" ? b.priceArgentina : b.priceArgentina / dollarValue
        return bPriceUSD2 - aPriceUSD2
      case "date":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "votes":
        const aVotes = a.votes.up - a.votes.down
        const bVotes = b.votes.up - b.votes.down
        return bVotes - aVotes
      default:
        return 0
    }
  })

  // Calculate category-specific KPI
  const categoryAvgDiff = productsWithVotes.reduce((acc, product) => {
    const isPriceInUSD = product.priceArgentinaCurreny === "USD"
    const dollarValue = getCurrentDollarValue()
    const priceInUSD = isPriceInUSD ? product.priceArgentina : product.priceArgentina / dollarValue
    const priceDiff = priceInUSD - product.priceUSA
    const percentageDiff = (priceDiff / product.priceUSA) * 100
    return acc + percentageDiff
  }, 0) / (productsWithVotes.length || 1)

  const isMoreExpensive = categoryAvgDiff > 0
  const statusText = isMoreExpensive
    ? `${category.name} está más cara en Argentina`
    : `${category.name} está más barata en Argentina`

  const handleVote = (productId: number, voteType: "up" | "down") => {
    setUserVotes(prev => ({
      ...prev,
      [productId]: prev[productId] === voteType ? null : voteType
    }))
    console.log(`Voted ${voteType} on product ${productId}`)
  }

  const handleContribution = (contribution: any) => {
    console.log("New contribution:", contribution)
    alert("¡Gracias por tu contribución! Será revisada por la comunidad.")
  }

  const handleAdminAction = (contributionId: number, action: "approve" | "reject") => {
    console.log(`Admin ${action} for contribution ${contributionId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground flex items-center gap-1">
            <Home className="w-4 h-4" />
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{category.name}</span>
        </nav>

        {/* Admin Panel - Hidden by default */}
        <div 
          className="absolute top-4 right-4 opacity-0 hover:opacity-30 transition-opacity"
          onClick={(e) => {
            if (e.detail === 3) {
              setIsAdminMode(!isAdminMode)
            }
          }}
        >
          <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
        </div>

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

        {/* Category Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2">
            {category.name} en Argentina
          </h1>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {category.description}
          </p>

          {/* Category KPI */}
          <Card className={`mx-auto mb-6 max-w-md ${isMoreExpensive ? "bg-red-50" : "bg-green-50"}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">
                Índice de {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`text-5xl font-bold mb-2 ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>
                {categoryAvgDiff.toFixed(1)}%
              </div>
              <p className={`text-sm ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>{statusText}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Basado en {productsWithVotes.length} producto(s) vs Estados Unidos
              </p>
            </CardContent>
          </Card>
        </div>

        <DollarSelector />

        {/* Controls Section */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Ordenar por:</span>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price_diff">Mayor diferencia</SelectItem>
                  <SelectItem value="price_low">Menor precio ARG</SelectItem>
                  <SelectItem value="price_high">Mayor precio ARG</SelectItem>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="date">Más reciente</SelectItem>
                  <SelectItem value="votes">Mejor valorado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}  
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <ContributionModal onSubmit={handleContribution} variant="subtle" />
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="mb-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onVote={handleVote}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="mb-8 space-y-4">
            {sortedProducts.map((product) => (
              <Card 
                key={product.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedProduct(product)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {product.priceArgentinaCurreny === "USD" ? "$" : "ARS "} {product.priceArgentina}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        vs USD {product.priceUSA}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {((product.priceArgentinaCurreny === "USD" ? product.priceArgentina : product.priceArgentina / getCurrentDollarValue()) - product.priceUSA) / product.priceUSA * 100 > 0 ? '+' : ''}
                        {(((product.priceArgentinaCurreny === "USD" ? product.priceArgentina : product.priceArgentina / getCurrentDollarValue()) - product.priceUSA) / product.priceUSA * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {sortedProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg mb-2">No hay productos en esta categoría</p>
            <p className="text-sm mb-4">¡Sé el primero en agregar uno!</p>
            <ContributionModal onSubmit={handleContribution} />
          </div>
        )}

        {/* Summary KPIs Section - Simplified for category */}
        <div className="mt-12 mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Indicadores de {category.name}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Productos</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sortedProducts.length}</div>
                <p className="text-xs text-muted-foreground">En esta categoría</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Promedio vs USA</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>
                  {categoryAvgDiff.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {isMoreExpensive ? "Más caro" : "Más barato"}
                </p>
              </CardContent>
            </Card>

            {summaryKpis.slice(0, 2).map((kpi: SummaryKpiType, index: number) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  {kpi.icon === "dollar" && <DollarSign className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "trending" && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
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

        {/* Product Detail Modal */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onReportIssue={(productId) => {
              console.log(`Report issue for product ${productId}`)
            }}
          />
        )}
      </div>
    </div>
  )
}