"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDollar } from "@/lib/context/dollar-context"
import { Loader2 } from "lucide-react"

interface DollarSelectorProps {
  variant?: "default" | "footer"
}

export default function DollarSelector({ variant = "default" }: DollarSelectorProps) {
  const { selectedDollar, setSelectedDollar, dollarTypes, isLoading } = useDollar()

  // Formatear la fecha de actualización
  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const isFooter = variant === "footer"
  
  return (
    <div className={`flex items-center gap-3 ${isFooter ? "justify-center" : "justify-end mb-6"}`}>
      <div className={`text-xs mr-2 ${isFooter ? "text-slate-300" : "text-muted-foreground"}`}>
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Actualizando cotizaciones...
          </div>
        ) : (
          <div>
            Actualizado: {formatDate(dollarTypes.find(d => d.id === selectedDollar)?.fechaActualizacion)}
          </div>
        )}
      </div>
      <Select value={selectedDollar} onValueChange={setSelectedDollar} disabled={isLoading}>
        <SelectTrigger 
          id="dollar-type" 
          className={`w-[200px] ${isFooter ? "bg-slate-800 border-slate-600 text-slate-200" : ""}`}
        >
          <SelectValue placeholder="Seleccionar dólar" />
        </SelectTrigger>
        <SelectContent className={isFooter ? "bg-slate-800 border-slate-600" : ""}>
          {dollarTypes.map((dollar) => (
            <SelectItem 
              key={dollar.id} 
              value={dollar.id}
              className={isFooter ? "text-slate-200 focus:bg-slate-700" : ""}
            >
              {dollar.name} - ARS {dollar.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
