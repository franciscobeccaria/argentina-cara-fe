"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Coffee, Utensils, ShoppingBag, TrendingUp, TrendingDown } from "lucide-react"

interface InsightData {
  id: number
  message: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  comparison: {
    argentina: { value: number; currency: string }
    other: { value: number; currency: string; country: string; flag: string }
  }
  category: string
}

const insightMessages: InsightData[] = [
  {
    id: 1,
    message: "Un café en Buenos Aires cuesta $5 USD vs $2.50 USD en París",
    icon: Coffee,
    color: "text-orange-600",
    comparison: {
      argentina: { value: 5, currency: "USD" },
      other: { value: 2.5, currency: "USD", country: "París", flag: "🇫🇷" }
    },
    category: "Gastronomía"
  },
  {
    id: 2,
    message: "Una cena en restaurante promedio: $35 USD en Buenos Aires vs $25 USD en Santiago",
    icon: Utensils,
    color: "text-purple-600",
    comparison: {
      argentina: { value: 35, currency: "USD" },
      other: { value: 25, currency: "USD", country: "Santiago", flag: "🇨🇱" }
    },
    category: "Gastronomía"
  },
  {
    id: 3,
    message: "Ropa básica: remera sin marca $12 USD en Avellaneda vs $8 USD en Shein",
    icon: ShoppingBag,
    color: "text-blue-600",
    comparison: {
      argentina: { value: 12, currency: "USD" },
      other: { value: 8, currency: "USD", country: "Shein", flag: "🛒" }
    },
    category: "Moda"
  },
  {
    id: 4,
    message: "Supermercado: canasta básica $180 USD en Argentina vs $120 USD en Brasil",
    icon: ShoppingBag,
    color: "text-green-600",
    comparison: {
      argentina: { value: 180, currency: "USD" },
      other: { value: 120, currency: "USD", country: "Brasil", flag: "🇧🇷" }
    },
    category: "Supermercado"
  },
  {
    id: 5,
    message: "Vacaciones: 1 semana en Mar del Plata $800 USD vs 1 semana en Florianópolis $600 USD",
    icon: TrendingUp,
    color: "text-teal-600",
    comparison: {
      argentina: { value: 800, currency: "USD" },
      other: { value: 600, currency: "USD", country: "Brasil", flag: "🇧🇷" }
    },
    category: "Turismo"
  }
]

export default function InsightCards() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Auto-rotate insights every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insightMessages.length)
        setIsVisible(true)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const insight = insightMessages[currentInsight]
  const priceDiff = ((insight.comparison.argentina.value - insight.comparison.other.value) / insight.comparison.other.value) * 100
  const isMoreExpensive = priceDiff > 0

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold tracking-tight mb-4 text-center">💡 Insights del Mundo Real</h2>
      
      <Card className={`transition-all duration-300 border-dashed ${
        isVisible ? 'opacity-100 transform-none' : 'opacity-70 transform scale-95'
      } ${isMoreExpensive ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-4">
            {/* Argentina Side */}
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🇦🇷</span>
                  <span className="text-sm font-medium">Argentina</span>
                </div>
                <div className="text-lg font-bold">
                  {insight.comparison.argentina.currency} {insight.comparison.argentina.value}
                </div>
              </div>
            </div>

            {/* Comparison Arrow */}
            <div className="flex flex-col items-center gap-1">
              <insight.icon className={`w-6 h-6 ${insight.color}`} />
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                isMoreExpensive 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {isMoreExpensive ? '+' : ''}{priceDiff.toFixed(0)}%
              </div>
            </div>

            {/* Other Country Side */}
            <div className="flex items-center gap-2">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{insight.comparison.other.flag}</span>
                  <span className="text-sm font-medium">{insight.comparison.other.country}</span>
                </div>
                <div className="text-lg font-bold">
                  {insight.comparison.other.currency} {insight.comparison.other.value}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground italic">
              "{insight.message}"
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground">Categoría:</span>
              <span className="text-xs font-medium bg-white px-2 py-1 rounded-full">
                {insight.category}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {insightMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(() => {
                    setCurrentInsight(index)
                    setIsVisible(true)
                  }, 300)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentInsight 
                    ? 'bg-gray-600' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}