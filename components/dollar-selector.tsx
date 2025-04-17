"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDollar } from "@/lib/context/dollar-context"
import { Loader2 } from "lucide-react"


export default function DollarSelector() {
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

  return (
    <div className="flex items-center justify-end mb-6 gap-2">
      <div className="text-xs text-muted-foreground mr-2">
        {isLoading ? (
          <div className="flex items-center">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Actualizando cotizaciones...
          </div>
        ) : (
          <div>
            Actualizado: {formatDate(dollarTypes.find(d => d.id === "blue")?.fechaActualizacion)}
          </div>
        )}
      </div>
      <Select value={selectedDollar} onValueChange={setSelectedDollar} disabled={isLoading}>
        <SelectTrigger id="dollar-type" className="w-[220px]">
          <SelectValue placeholder="Seleccionar dólar" />
        </SelectTrigger>
        <SelectContent>
          {dollarTypes.map((dollar) => (
            <SelectItem key={dollar.id} value={dollar.id}>
              {dollar.name} - ARS {dollar.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
