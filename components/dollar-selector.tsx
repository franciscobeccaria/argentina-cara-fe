"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dollarTypes, useDollar } from "@/lib/context/dollar-context"


export default function DollarSelector() {
  const { selectedDollar, setSelectedDollar } = useDollar()

  return (
    <div className="flex items-center justify-end mb-6 gap-2">
      <Select value={selectedDollar} onValueChange={setSelectedDollar}>
        <SelectTrigger id="dollar-type" className="w-[200px]">
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
