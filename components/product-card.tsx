import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { ProductType } from "@/lib/types"
import { 
  ArrowDown, 
  ArrowUp, 
  CalendarIcon, 
  DollarSign, 
  Percent,
  ThumbsUp,
  ThumbsDown,
  Bot,
  User,
  Shield,
  Edit,
  ExternalLink,
  CheckCircle
} from "lucide-react"
import { useDollar } from "@/lib/context/dollar-context"

interface ProductCardProps {
  product: ProductType
  onVote?: (productId: number, voteType: "up" | "down") => void
  onClick?: () => void
}

export default function ProductCard({ product, onVote, onClick }: ProductCardProps) {
  const { 
    id,
    name, 
    priceArgentina, 
    priceArgentinaCurreny, 
    priceUSA, 
    image, 
    lastUpdated,
    dataSource,
    sourceUrl,
    votes,
    contributorName,
    verificationStatus
  } = product
  const { getCurrentDollarValue } = useDollar()
  const isPriceInUSD = priceArgentinaCurreny === "USD"
  const dollarValue = getCurrentDollarValue()
  const priceInUSD = isPriceInUSD ? priceArgentina : priceArgentina / dollarValue
  const priceInARS = isPriceInUSD ? priceArgentina * dollarValue : priceArgentina

  const priceDiff = priceInUSD - priceUSA
  const percentageDiff = (priceDiff / priceUSA) * 100
  const isHigher = priceDiff > 0

  const netVotes = votes.up - votes.down

  const getDataSourceInfo = () => {
    switch (dataSource) {
      case "scraped":
        return { icon: Bot, label: "Automático", color: "bg-blue-50 text-blue-700" }
      case "manual":
        return { icon: Edit, label: "Manual", color: "bg-purple-50 text-purple-700" }
      case "user_contributed":
        return { icon: User, label: "Contribución", color: "bg-orange-50 text-orange-700" }
      case "verified":
        return { icon: Shield, label: "Verificado", color: "bg-green-50 text-green-700" }
      default:
        return { icon: User, label: "Usuario", color: "bg-gray-50 text-gray-700" }
    }
  }

  const sourceInfo = getDataSourceInfo()

  const handleVote = (voteType: "up" | "down") => {
    if (onVote) {
      onVote(id, voteType)
    }
  }

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
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <div className="relative h-20 bg-slate-100">
        <Image
          src={image || "/placeholder.svg?height=80&width=200"}
          alt={name}
          fill
          className="object-cover opacity-80"
        />
        {/* Only show verification badge for verified items */}
        {(dataSource === "verified" || verificationStatus === "approved") && (
          <div className="absolute top-1 right-1">
            <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs px-1 py-0">
              <CheckCircle className="w-2 h-2" />
            </Badge>
          </div>
        )}
        {/* Price difference indicator */}
        <div className="absolute bottom-1 right-1">
          <div
            className={`flex items-center justify-center rounded-full px-1.5 py-0.5 ${isHigher ? "bg-red-50" : "bg-green-50"}`}
          >
            <div
              className={`flex items-center gap-0.5 font-bold text-xs ${isHigher ? "text-red-600" : "text-green-600"}`}
            >
              {isHigher ? <ArrowUp className="w-2 h-2" /> : <ArrowDown className="w-2 h-2" />}
              {percentageDiff.toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
      <CardHeader className="pb-0 pt-2 px-3">
        <CardTitle className="text-xs font-medium truncate leading-tight">{name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1 pb-2 px-3">
        {/* Compact price comparison */}
        <div className="flex justify-between items-center text-xs mb-1">
          <div>
            <span className="font-medium">${formatMoney(isPriceInUSD ? priceArgentina : priceInUSD)}</span>
          </div>
          <div>
            <span className="font-medium">${formatMoney(priceUSA)}</span>
          </div>
        </div>

        {/* Very compact footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <Button
              variant={votes.userVote === "up" ? "default" : "ghost"}
              size="sm"
              className="h-5 px-1 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handleVote("up")
              }}
            >
              <ThumbsUp className="h-2 w-2" />
              <span className="ml-0.5">{votes.up}</span>
            </Button>
            <Button
              variant={votes.userVote === "down" ? "destructive" : "ghost"}
              size="sm"
              className="h-5 px-1 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handleVote("down")
              }}
            >
              <ThumbsDown className="h-2 w-2" />
              <span className="ml-0.5">{votes.down}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
