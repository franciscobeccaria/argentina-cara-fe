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
      <div className="relative h-32 bg-slate-100">
        <Image
          src={image || "/placeholder.svg?height=160&width=320"}
          alt={name}
          fill
          className="object-cover opacity-80"
        />
        {/* Data source badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className={`text-xs ${sourceInfo.color}`}>
            <sourceInfo.icon className="w-3 h-3 mr-1" />
            {sourceInfo.label}
          </Badge>
        </div>
        {/* Verification badge */}
        {(dataSource === "verified" || verificationStatus === "approved") && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-green-50 text-green-700">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verificado
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium truncate">{name}</CardTitle>
          <div
            className={`flex items-center justify-center rounded-full px-2 py-1 ${isHigher ? "bg-red-50" : "bg-green-50"}`}
          >
            <div
              className={`flex items-center gap-1 font-bold text-xs ${isHigher ? "text-red-600" : "text-green-600"}`}
            >
              {isHigher ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
              {percentageDiff.toFixed(0)}%
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        {/* Simplified price comparison */}
        <div className="flex justify-between items-center text-xs mb-2">
          <div>
            <span className="text-muted-foreground">ARG: </span>
            <span className="font-medium">${formatMoney(isPriceInUSD ? priceArgentina : priceInUSD)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">USA: </span>
            <span className="font-medium">${formatMoney(priceUSA)}</span>
          </div>
        </div>

        {/* Compact footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button
              variant={votes.userVote === "up" ? "default" : "ghost"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handleVote("up")
              }}
            >
              <ThumbsUp className="h-2 w-2 mr-1" />
              {votes.up}
            </Button>
            <Button
              variant={votes.userVote === "down" ? "destructive" : "ghost"}
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation()
                handleVote("down")
              }}
            >
              <ThumbsDown className="h-2 w-2 mr-1" />
              {votes.down}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {formatDate(lastUpdated).split(' ')[0]}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
