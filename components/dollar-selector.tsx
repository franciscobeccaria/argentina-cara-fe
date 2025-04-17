"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface DollarType {
  id: string
  name: string
  value: number
}

const dollarTypes: DollarType[] = [
  {
    id: "blue",
    name: "Dólar Blue",
    value: 1000,
  },
  {
    id: "oficial",
    name: "Dólar Oficial",
    value: 870,
  },
  {
    id: "mep",
    name: "Dólar MEP",
    value: 980,
  },
  {
    id: "ccl",
    name: "Dólar CCL",
    value: 990,
  },
]

export default function DollarSelector() {
  const [selectedDollar, setSelectedDollar] = useState<string>("blue")

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
