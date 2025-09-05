"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ExternalLink, Info, TrendingUp, MapPin } from "lucide-react"
import Image from "next/image"
import type { ProductType } from "@/lib/types"
import { useDollar } from "@/lib/context/dollar-context"

interface ProductModalProps {
  product: ProductType | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { getCurrentDollarValue } = useDollar()

  if (!product) return null

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
    category,
    location,
    description,
    methodology,
  } = product

  const isPriceInUSD = priceArgentinaCurreny === "USD"
  const dollarValue = getCurrentDollarValue()
  const priceInUSD = isPriceInUSD ? priceArgentina : priceArgentina / dollarValue
  const priceInARS = isPriceInUSD ? priceArgentina * dollarValue : priceArgentina

  function formatMoney(value: number) {
    const showDecimals = value <= 99
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
      useGrouping: true,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Prepare comparison data
  const comparisons = [
    { 
      country: "Argentina", 
      price: priceInUSD, 
      currency: "USD",
      originalPrice: isPriceInUSD ? priceArgentina : priceArgentina,
      originalCurrency: isPriceInUSD ? "USD" : "ARS",
      flag: "🇦🇷",
      isBase: true
    },
    { 
      country: "Estados Unidos", 
      price: priceUSA, 
      currency: "USD", 
      flag: "🇺🇸",
      isBase: false
    },
    ...(priceChile ? [{ 
      country: "Chile", 
      price: priceChile, 
      currency: "USD", 
      flag: "🇨🇱",
      isBase: false 
    }] : []),
    ...(priceBrazil ? [{ 
      country: "Brasil", 
      price: priceBrazil, 
      currency: "USD", 
      flag: "🇧🇷",
      isBase: false 
    }] : []),
    ...(priceEurope ? [{ 
      country: "Europa", 
      price: priceEurope, 
      currency: "USD", 
      flag: "🇪🇺",
      isBase: false 
    }] : []),
  ]

  const minPrice = Math.min(...comparisons.map(c => c.price))
  const maxPrice = Math.max(...comparisons.map(c => c.price))

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={image || "/placeholder.svg?height=80&width=80"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
                {brand && <Badge variant="secondary">{brand}</Badge>}
              </div>
              {description && (
                <p className="text-muted-foreground mt-2">{description}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Actualizado: {formatDate(lastUpdated)}
                </div>
                <Badge variant="outline" className="capitalize">
                  {category}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Comparison Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Comparación de Precios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {comparisons.map((comparison) => {
                  const percentage = ((comparison.price - minPrice) / (maxPrice - minPrice)) * 100
                  const diffFromArgentina = ((comparison.price - priceInUSD) / priceInUSD * 100)
                  
                  return (
                    <div key={comparison.country} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{comparison.flag}</span>
                          <span className="font-medium">{comparison.country}</span>
                          {comparison.isBase && (
                            <Badge variant="outline" className="text-xs">Base</Badge>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            {comparison.currency} {formatMoney(comparison.price)}
                          </div>
                          {comparison.originalCurrency && comparison.originalCurrency !== comparison.currency && (
                            <div className="text-xs text-muted-foreground">
                              {comparison.originalCurrency} {formatMoney(comparison.originalPrice)}
                            </div>
                          )}
                          {!comparison.isBase && (
                            <div className={`text-xs font-medium ${
                              diffFromArgentina > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {diffFromArgentina > 0 ? '+' : ''}{diffFromArgentina.toFixed(1)}% vs ARG
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            comparison.isBase 
                              ? 'bg-blue-500' 
                              : comparison.price === minPrice 
                                ? 'bg-green-500' 
                                : comparison.price === maxPrice 
                                  ? 'bg-red-500' 
                                  : 'bg-slate-400'
                          }`}
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          {location && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ubicaciones de Referencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{location}</p>
              </CardContent>
            </Card>
          )}

          {/* Methodology */}
          {methodology && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Metodología
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {methodology}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Key Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis Clave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-green-700">País más económico</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {comparisons.find(c => c.price === minPrice)?.flag}
                    </span>
                    <span className="font-medium">
                      {comparisons.find(c => c.price === minPrice)?.country}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      USD {formatMoney(minPrice)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-red-700">País más caro</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {comparisons.find(c => c.price === maxPrice)?.flag}
                    </span>
                    <span className="font-medium">
                      {comparisons.find(c => c.price === maxPrice)?.country}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      USD {formatMoney(maxPrice)}
                    </span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Diferencia máxima: <span className="font-semibold">
                    {((maxPrice - minPrice) / minPrice * 100).toFixed(1)}%
                  </span> entre el país más caro y más barato
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-xs text-muted-foreground">
              Última actualización: {formatDate(lastUpdated)}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                Reportar Error
              </Button>
              <Button onClick={onClose} size="sm">
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}