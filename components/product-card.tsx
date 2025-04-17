import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import type { ProductType } from "@/lib/types"
import { ArrowDown, ArrowUp, CalendarIcon, DollarSign, Percent } from "lucide-react"
import { useDollar } from "@/lib/context/dollar-context"

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, priceArgentina, priceArgentinaCurreny, priceUSA, image, lastUpdated } = product
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
  

  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-slate-100">
        <Image
          src={image || "/placeholder.svg?height=160&width=320"}
          alt={name}
          fill
          className="object-cover opacity-80"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          <div
            className={`flex items-center justify-center rounded-full p-2 ${isHigher ? "bg-red-50" : "bg-green-50"}`}
          >
            <div
              className={`flex items-center gap-1 font-bold text-sm ${isHigher ? "text-red-600" : "text-green-600"}`}
            >
              {isHigher ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {percentageDiff.toFixed(1)}
              <Percent className="w-4 h-4" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div>
              <p className="text-muted-foreground">Argentina</p>
              {isPriceInUSD ? (
                <>
                  <p className="font-medium">USD {formatMoney(priceArgentina)}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center">
                    ARS {formatMoney(priceInARS)}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium">ARS {formatMoney(priceArgentina)}</p>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                   USD {formatMoney(priceInUSD)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div>
              <p className="text-muted-foreground">EE.UU.</p>
              <p className="font-medium">USD {formatMoney(priceUSA)}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 text-xs text-muted-foreground">
          <CalendarIcon className="h-3 w-3 mr-2" />
          Actualizado: {formatDate(lastUpdated)}
        </div>
      </CardContent>
    </Card>
  )
}
