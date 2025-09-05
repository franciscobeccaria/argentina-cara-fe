"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, ExternalLink, ShoppingCart, CheckCircle, ArrowUpRight } from "lucide-react"
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
    image,
    lastUpdated,
    brand,
    category,
    description,
    sources,
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

  // Calculate price difference
  const priceDiff = priceInUSD - priceUSA
  const percentageDiff = (priceDiff / priceUSA) * 100
  const isArgentinaMore = percentageDiff > 0

  // Determine secondary comparison (Chile if available, otherwise none)
  const secondaryComparison = priceChile ? {
    country: "Chile",
    price: priceChile,
    flag: "🇨🇱",
    diff: ((priceInUSD - priceChile) / priceChile) * 100
  } : null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={image || "/placeholder.svg?height=64&width=64"}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold mb-2">{name}</DialogTitle>
              <div className="flex items-center gap-3 text-sm">
                {brand && <Badge variant="secondary">{brand}</Badge>}
                <Badge variant="outline" className="capitalize">
                  {category}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  {formatDate(lastUpdated)}
                </div>
              </div>
              {description && (
                <p className="text-muted-foreground text-sm mt-2">{description}</p>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Price Comparison */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Argentina */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇦🇷</span>
                    <h3 className="font-semibold">Argentina</h3>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold">
                      {isPriceInUSD ? `USD ${formatMoney(priceArgentina)}` : `ARS ${formatMoney(priceArgentina)}`}
                    </div>
                    {isPriceInUSD ? (
                      <div className="text-sm text-muted-foreground">
                        ARS {formatMoney(priceInARS)}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        USD {formatMoney(priceInUSD)}
                      </div>
                    )}
                  </div>

                  {sources?.argentina && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="text-muted-foreground">Fuente:</span>
                        <span>{sources.argentina.storeName}</span>
                        {sources.argentina.verified && (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        )}
                      </div>
                      {sources.argentina.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(sources.argentina.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Ver Precio
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* USA */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🇺🇸</span>
                    <h3 className="font-semibold">Estados Unidos</h3>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold">USD {formatMoney(priceUSA)}</div>
                  </div>

                  {sources?.usa && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="text-muted-foreground">Fuente:</span>
                        <span>{sources.usa.storeName}</span>
                        {sources.usa.verified && (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        )}
                      </div>
                      {sources.usa.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(sources.usa.url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Ver Precio
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Price Analysis */}
              <div className="text-center space-y-2">
                <div className={`text-3xl font-bold ${isArgentinaMore ? 'text-red-600' : 'text-green-600'}`}>
                  {isArgentinaMore ? '+' : ''}{percentageDiff.toFixed(1)}%
                </div>
                <p className={`text-sm font-medium ${isArgentinaMore ? 'text-red-600' : 'text-green-600'}`}>
                  Argentina está {Math.abs(percentageDiff).toFixed(1)}% 
                  {isArgentinaMore ? ' más cara' : ' más barata'} que Estados Unidos
                </p>
                <p className="text-xs text-muted-foreground">
                  Diferencia: USD {Math.abs(priceDiff).toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Comparison (if available) */}
          {secondaryComparison && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{secondaryComparison.flag}</span>
                    <div>
                      <div className="font-medium">{secondaryComparison.country}</div>
                      <div className="text-sm text-muted-foreground">
                        USD {formatMoney(secondaryComparison.price)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${secondaryComparison.diff > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {secondaryComparison.diff > 0 ? '+' : ''}{secondaryComparison.diff.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">vs Argentina</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Methodology (if available) */}
          {product.methodology && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Metodología</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.methodology}
                </p>
              </CardContent>
            </Card>
          )}

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