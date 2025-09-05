"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Coffee, Smartphone, ShoppingBag, Gamepad2 } from "lucide-react"
import type { ComparisonMessageType } from "@/lib/types"

interface ComparisonCardsProps {
  comparisons: ComparisonMessageType[]
  onContactClick?: () => void
}

const categoryIcons = {
  food: Coffee,
  technology: Smartphone,
  retail: ShoppingBag,
  services: TrendingUp,
  lifestyle: Gamepad2,
}

const countryFlags = {
  usa: "🇺🇸",
  chile: "🇨🇱", 
  brazil: "🇧🇷",
  europe: "🇪🇺"
}

export default function ComparisonCards({ comparisons, onContactClick }: ComparisonCardsProps) {
  if (!comparisons?.length) return null

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Comparaciones Destacadas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las diferencias más sorprendentes de precios entre Argentina y el mundo
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((comparison) => {
            const Icon = categoryIcons[comparison.category] || TrendingUp
            const isArgentinaCheaper = comparison.argentinaDifference.includes("más barato")
            const flag = countryFlags[comparison.comparison]
            
            return (
              <Card 
                key={comparison.id} 
                className={`overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  isArgentinaCheaper 
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" 
                    : "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${
                      isArgentinaCheaper ? "bg-green-100" : "bg-red-100"
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isArgentinaCheaper ? "text-green-600" : "text-red-600"
                      }`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        🇦🇷 vs {flag}
                      </Badge>
                      <Badge 
                        variant={isArgentinaCheaper ? "default" : "destructive"}
                        className="text-xs font-semibold"
                      >
                        {isArgentinaCheaper ? <TrendingDown className="w-3 h-3 mr-1" /> : <TrendingUp className="w-3 h-3 mr-1" />}
                        {comparison.argentinaDifference}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-slate-900">
                    {comparison.title}
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    {comparison.message}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <span className="text-xs text-slate-500 capitalize">
                      {comparison.category.replace("_", " ")}
                    </span>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      isArgentinaCheaper 
                        ? "bg-green-200 text-green-800" 
                        : "bg-red-200 text-red-800"
                    }`}>
                      {isArgentinaCheaper ? "💰 Ventaja AR" : "💸 Más Caro"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-slate-200">
            <span className="text-sm text-slate-600">
              ¿Quieres contribuir con más comparaciones?
            </span>
            <button 
              onClick={onContactClick}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Contactanos →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}