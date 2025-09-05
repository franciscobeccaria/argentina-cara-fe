"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import {
  ExternalLink,
  Calendar,
  Shield,
  Bot,
  User,
  Edit,
  CheckCircle,
  Flag,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import type { ProductType } from "@/lib/types"

interface ProductDetailModalProps {
  product: ProductType
  isOpen: boolean
  onClose: () => void
  onReportIssue?: (productId: number) => void
}

export default function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose,
  onReportIssue 
}: ProductDetailModalProps) {
  const {
    id,
    name,
    image,
    priceArgentina,
    priceArgentinaCurreny,
    priceUSA,
    dataSource,
    sourceUrl,
    votes,
    contributorName,
    verificationStatus,
    lastUpdated,
    categoryType
  } = product

  // Mock data for multi-country comparison
  const multiCountryPrices = [
    { country: "Argentina", price: priceArgentina, currency: priceArgentinaCurreny, flag: "🇦🇷" },
    { country: "Estados Unidos", price: priceUSA, currency: "USD", flag: "🇺🇸" },
    { country: "Chile", price: priceUSA * 0.85, currency: "USD", flag: "🇨🇱" },
    { country: "Brasil", price: priceUSA * 0.75, currency: "USD", flag: "🇧🇷" },
    { country: "España", price: priceUSA * 1.15, currency: "EUR", flag: "🇪🇸" },
  ]

  const getDataSourceInfo = () => {
    switch (dataSource) {
      case "scraped":
        return { 
          icon: Bot, 
          label: "Scraping Automático", 
          color: "bg-blue-50 text-blue-700",
          description: "Precio obtenido automáticamente del sitio web oficial"
        }
      case "manual":
        return { 
          icon: Edit, 
          label: "Entrada Manual", 
          color: "bg-purple-50 text-purple-700",
          description: "Precio ingresado manualmente por nuestro equipo"
        }
      case "user_contributed":
        return { 
          icon: User, 
          label: "Contribución de Usuario", 
          color: "bg-orange-50 text-orange-700",
          description: "Precio reportado por un usuario de la comunidad"
        }
      case "verified":
        return { 
          icon: Shield, 
          label: "Verificado", 
          color: "bg-green-50 text-green-700",
          description: "Precio verificado y confirmado por nuestro equipo"
        }
      default:
        return { 
          icon: User, 
          label: "Usuario", 
          color: "bg-gray-50 text-gray-700",
          description: "Fuente de datos no especificada"
        }
    }
  }

  const sourceInfo = getDataSourceInfo()
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatMoney = (value: number) => {
    const showDecimals = value <= 99
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
      useGrouping: true,
    }).format(value)
  }

  // Calculate cheapest country
  const cheapestCountry = multiCountryPrices.reduce((min, current) => {
    const currentPriceUSD = current.currency === "USD" ? current.price : current.price / 1200
    const minPriceUSD = min.currency === "USD" ? min.price : min.price / 1200
    return currentPriceUSD < minPriceUSD ? current : min
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Product Info */}
          <div className="space-y-4">
            {/* Product Image */}
            <div className="relative h-64 bg-slate-100 rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=256&width=400"}
                alt={name}
                fill
                className="object-cover"
              />
              {/* Source Badge */}
              <div className="absolute top-2 left-2">
                <Badge variant="secondary" className={sourceInfo.color}>
                  <sourceInfo.icon className="w-3 h-3 mr-1" />
                  {sourceInfo.label}
                </Badge>
              </div>
              {/* Verification Badge */}
              {(dataSource === "verified" || verificationStatus === "approved") && (
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verificado
                  </Badge>
                </div>
              )}
            </div>

            {/* Source Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <sourceInfo.icon className="w-4 h-4" />
                  Información de la Fuente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {sourceInfo.description}
                </p>
                
                {sourceUrl && (
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                    <a 
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      Ver fuente original
                    </a>
                  </div>
                )}

                {contributorName && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">
                      Contribuido por: <strong>{contributorName}</strong>
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-muted-foreground">
                    Actualizado: {formatDate(lastUpdated)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Community Voting */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Valoración de la Comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{votes.up}</span>
                      <span className="text-xs text-muted-foreground">útil</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-medium">{votes.down}</span>
                      <span className="text-xs text-muted-foreground">no útil</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReportIssue && onReportIssue(id)}
                    className="text-xs"
                  >
                    <Flag className="w-3 h-3 mr-1" />
                    Reportar error
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Price Comparison */}
          <div className="space-y-4">
            {/* Best Deal Alert */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-green-700">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Más barato en: {cheapestCountry.flag} {cheapestCountry.country}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Multi-Country Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Comparación Internacional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {multiCountryPrices.map((country, index) => {
                  const isArgentina = country.country === "Argentina"
                  const isUSA = country.country === "Estados Unidos"
                  const priceUSD = country.currency === "USD" ? country.price : country.price / 1200
                  const priceDiff = ((priceUSD - priceUSA) / priceUSA) * 100
                  const isHigher = priceDiff > 0

                  return (
                    <div 
                      key={country.country}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        isArgentina ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{country.flag}</span>
                        <div>
                          <p className="font-medium text-sm">{country.country}</p>
                          {!isUSA && (
                            <div className="flex items-center gap-1">
                              {isHigher ? (
                                <ArrowUp className="w-3 h-3 text-red-500" />
                              ) : (
                                <ArrowDown className="w-3 h-3 text-green-500" />
                              )}
                              <span className={`text-xs ${isHigher ? 'text-red-500' : 'text-green-500'}`}>
                                {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(0)}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">
                          {country.currency} {formatMoney(country.price)}
                        </p>
                        {country.currency !== "USD" && (
                          <p className="text-xs text-muted-foreground">
                            ≈ USD {formatMoney(priceUSD)}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Estadísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Categoría:</span>
                  <span className="font-medium capitalize">{categoryType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confiabilidad:</span>
                  <Badge variant="outline" className="text-xs">
                    {dataSource === "verified" ? "Alta" : dataSource === "scraped" ? "Media-Alta" : "Media"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Última actualización:</span>
                  <span className="font-medium">
                    {new Date(lastUpdated).toLocaleDateString("es-AR")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}