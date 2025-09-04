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
}

export default function ProductCard({ product, onVote }: ProductCardProps) {
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
    <Card className="overflow-hidden">
      <div className="relative h-40 bg-slate-100">
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

        {/* Contributor info */}
        {contributorName && (
          <div className="mt-3 text-xs text-muted-foreground">
            Contribuido por: <span className="font-medium">{contributorName}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-2" />
            {formatDate(lastUpdated)}
            {sourceUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 p-0 h-auto text-xs text-muted-foreground hover:text-primary"
                onClick={() => window.open(sourceUrl, "_blank")}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Ver fuente
              </Button>
            )}
          </div>

          {/* Voting controls */}
          <div className="flex items-center gap-1">
            <Button
              variant={votes.userVote === "up" ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2"
              onClick={() => handleVote("up")}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              {votes.up}
            </Button>
            <Button
              variant={votes.userVote === "down" ? "destructive" : "ghost"}
              size="sm"
              className="h-7 px-2"
              onClick={() => handleVote("down")}
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              {votes.down}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
