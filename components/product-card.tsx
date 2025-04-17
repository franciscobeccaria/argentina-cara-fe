import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { ProductType } from "@/lib/types"

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  const { name, priceARS, priceUSDBlue, priceUSA, priceDifferencePercentage, image } = product

  const isMoreExpensive = priceDifferencePercentage > 0
  const badgeText = isMoreExpensive
    ? `+${priceDifferencePercentage}% más caro`
    : `${Math.abs(priceDifferencePercentage)}% más barato`

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
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge
            variant={isMoreExpensive ? "destructive" : "success"}
            className={isMoreExpensive ? "bg-red-500" : "bg-green-500"}
          >
            {badgeText}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Argentina</p>
            <p className="font-medium">ARS {priceARS.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">USD {priceUSDBlue} (blue)</p>
          </div>
          <div>
            <p className="text-muted-foreground">EE.UU.</p>
            <p className="font-medium">USD {priceUSA}</p>
            <p className="text-xs text-muted-foreground">Precio oficial</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
