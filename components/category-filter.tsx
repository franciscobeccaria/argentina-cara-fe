"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categoryIndices } from "@/lib/data"
import type { CategoryType } from "@/lib/types"
import { 
  Smartphone, 
  Coffee, 
  Shirt, 
  Home, 
  Car, 
  Package,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter
} from "lucide-react"

interface CategoryFilterProps {
  selectedCategory: CategoryType | "all"
  onCategoryChange: (category: CategoryType | "all") => void
}

const categoryIcons = {
  tech: Smartphone,
  food: Coffee,
  fashion: Shirt,
  home: Home,
  cars: Car,
  other: Package,
}

const categoryNames = {
  tech: "Tecnología",
  food: "Gastronomía", 
  fashion: "Moda",
  home: "Hogar",
  cars: "Autos",
  other: "Otros",
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3" />
      case "down": return <TrendingDown className="h-3 w-3" />
      default: return <Minus className="h-3 w-3" />
    }
  }

  const getIndexColor = (color: string) => {
    switch (color) {
      case "green": return "text-green-600 bg-green-50"
      case "yellow": return "text-yellow-600 bg-yellow-50"
      case "red": return "text-red-600 bg-red-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Índices por Categoría
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => onCategoryChange("all")}
            className="justify-start h-auto p-3"
          >
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-2 mb-1">
                <Package className="h-4 w-4" />
                <span className="font-medium">Todos</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Ver todo
              </span>
            </div>
          </Button>

          {categoryIndices.map((categoryIndex) => {
            const IconComponent = categoryIcons[categoryIndex.category]
            const isSelected = selectedCategory === categoryIndex.category
            
            return (
              <Button
                key={categoryIndex.category}
                variant={isSelected ? "default" : "outline"}
                onClick={() => onCategoryChange(categoryIndex.category)}
                className="justify-start h-auto p-3 relative"
              >
                <div className="flex flex-col items-start w-full">
                  <div className="flex items-center gap-2 mb-1">
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">{categoryIndex.name}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getIndexColor(categoryIndex.color)}`}
                    >
                      <div className="flex items-center gap-1">
                        {getTrendIcon(categoryIndex.trend)}
                        {categoryIndex.index > 0 ? "+" : ""}{categoryIndex.index}%
                      </div>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {categoryIndex.productCount} productos
                    </span>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>
        
        <div className="mt-4 p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600">Más barato</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-yellow-600">Similar</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-600">Más caro</span>
              </div>
            </div>
            <span className="text-muted-foreground">vs Estados Unidos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}