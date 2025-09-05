import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { ProductType } from "@/lib/types"
import { ArrowDown, ArrowUp, CalendarIcon, DollarSign, Percent, Info, Eye } from "lucide-react"
import { useDollar } from "@/lib/context/dollar-context"
import ProductModal from "./product-modal"

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const { 
    name, 
    priceArgentina, 
    priceArgentinaCurreny, 
    priceUSA, 
    priceChile,
    priceBrazil,
    priceEurope,
    image, 
    lastUpdated,
    brand,
    location,
    description
  } = product
  
  const { getCurrentDollarValue } = useDollar()
  const isPriceInUSD = priceArgentinaCurreny === "USD"
  const dollarValue = getCurrentDollarValue()
  const priceInUSD = isPriceInUSD ? priceArgentina : priceArgentina / dollarValue
  const priceInARS = isPriceInUSD ? priceArgentina * dollarValue : priceArgentina

  const priceDiff = priceInUSD - priceUSA
  const percentageDiff = (priceDiff / priceUSA) * 100
  const isHigher = priceDiff > 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  function formatMoney(value: number) {
    const showDecimals = value <= 99;
  
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
      useGrouping: true,
    }).format(value);
  }

  // Get available comparisons
  const comparisons = [
    { country: "EE.UU.", price: priceUSA, flag: "🇺🇸" },
    ...(priceChile ? [{ country: "Chile", price: priceChile, flag: "🇨🇱" }] : []),
    ...(priceBrazil ? [{ country: "Brasil", price: priceBrazil, flag: "🇧🇷" }] : []),
    ...(priceEurope ? [{ country: "Europa", price: priceEurope, flag: "🇪🇺" }] : []),
  ]

  // Find best and worst deals for Argentina
  const argentinaInUSD = priceInUSD
  const bestDeal = Math.min(...comparisons.map(c => c.price))
  const worstDeal = Math.max(...comparisons.map(c => c.price))
  const isBestDeal = argentinaInUSD <= bestDeal
  const isWorstDeal = argentinaInUSD >= worstDeal

  return (
    <>
    <Card 
      className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer" 
      onClick={() => setIsModalOpen(true)}
    >
      <div className="relative h-32 bg-slate-100 group-hover:bg-slate-50 transition-colors">
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <Image
          src={image || "/placeholder.svg?height=160&width=320"}
          alt={name}
          fill
          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {brand && (
          <Badge variant="secondary" className="absolute top-2 left-2 text-xs">
            {brand}
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-sm font-semibold leading-tight">{name}</CardTitle>
            {description && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <div
            className={`flex items-center justify-center rounded-full p-1.5 shrink-0 ${
              isHigher ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <div
              className={`flex items-center gap-1 font-bold text-xs ${
                isHigher ? "text-red-600" : "text-green-600"
              }`}
            >
              {isHigher ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {Math.abs(percentageDiff).toFixed(0)}%
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Argentina Price */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-muted-foreground">Argentina 🇦🇷</p>
            {isBestDeal && <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-green-50 text-green-700">Mejor</Badge>}
            {isWorstDeal && <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-red-50 text-red-700">Peor</Badge>}
          </div>
          {isPriceInUSD ? (
            <div>
              <p className="font-semibold text-sm">USD {formatMoney(priceArgentina)}</p>
              <p className="text-xs text-muted-foreground">
                ARS {formatMoney(priceInARS)}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-sm">ARS {formatMoney(priceArgentina)}</p>
              <p className="text-xs text-muted-foreground">
                USD {formatMoney(priceInUSD)}
              </p>
            </div>
          )}
        </div>

        {/* Other Countries */}
        <div className="space-y-2">
          {comparisons.slice(0, 2).map((comparison, index) => {
            const diff = ((priceInUSD - comparison.price) / comparison.price * 100)
            return (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {comparison.flag} {comparison.country}
                </span>
                <div className="text-right">
                  <span className="font-medium">USD {formatMoney(comparison.price)}</span>
                  <span className={`ml-2 text-xs ${diff > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {diff > 0 ? '+' : ''}{diff.toFixed(0)}%
                  </span>
                </div>
              </div>
            )
          })}
          
          {/* Show additional countries if available */}
          {comparisons.length > 2 && (
            <div className="text-xs text-muted-foreground text-center pt-1 border-t">
              +{comparisons.length - 2} países más
            </div>
          )}
        </div>

        {/* Location info */}
        {location && (
          <div className="mt-3 pt-2 border-t">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              {location}
            </p>
          </div>
        )}

        <div className="flex items-center mt-3 text-xs text-muted-foreground">
          <CalendarIcon className="h-3 w-3 mr-1" />
          {formatDate(lastUpdated)}
        </div>
      </CardContent>
    </Card>

    <ProductModal 
      product={product}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  )
}
