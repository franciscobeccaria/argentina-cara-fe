"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"

export interface DollarType {
  id: string
  name: string
  value: number
  compra?: number
  fechaActualizacion?: string
}

const defaultDollarTypes: DollarType[] = [
  { id: "blue", name: "Dólar Blue", value: 1250 },
  { id: "oficial", name: "Dólar Oficial", value: 1160 },
  { id: "bolsa", name: "Dólar MEP", value: 1175 },
  { id: "contadoconliqui", name: "Dólar CCL", value: 1191 },
  { id: "cripto", name: "Dólar Cripto", value: 1207 },
]

interface DollarContextType {
  selectedDollar: string
  setSelectedDollar: (id: string) => void
  getCurrentDollarValue: () => number
  dollarTypes: DollarType[]
  isLoading: boolean
}

const DollarContext = createContext<DollarContextType | undefined>(undefined)

async function fetchDollarRates(): Promise<DollarType[]> {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares')
    const data = await response.json()

    return data.map((item: any) => ({
      id: item.casa,
      name: item.nombre,
      value: item.venta,
      compra: item.compra,
      fechaActualizacion: item.fechaActualizacion,
    }))
  } catch (error) {
    console.error("Error fetching dollar rates:", error)
    return defaultDollarTypes // Fallback
  }
}

export function DollarProvider({ children }: { children: ReactNode }) {
  const [selectedDollar, setSelectedDollar] = useState<string>("blue")

  const { data: dollarTypes = defaultDollarTypes, isLoading } = useQuery({
    queryKey: ["dollarTypes"],
    queryFn: fetchDollarRates,
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })

  const getCurrentDollarValue = () => {
    const dollar = dollarTypes.find((d) => d.id === selectedDollar)
    return dollar ? dollar.value : defaultDollarTypes[0].value
  }

  return (
    <DollarContext.Provider value={{
      selectedDollar,
      setSelectedDollar,
      getCurrentDollarValue,
      dollarTypes,
      isLoading
    }}>
      {children}
    </DollarContext.Provider>
  )
}

export function useDollar() {
  const context = useContext(DollarContext)
  if (!context) {
    throw new Error("useDollar must be used within a DollarProvider")
  }
  return context
}
