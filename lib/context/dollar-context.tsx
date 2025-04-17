"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface DollarType {
  id: string
  name: string
  value: number
}

export const dollarTypes: DollarType[] = [
  {
    id: "blue",
    name: "Dólar Blue",
    value: 1250,
  },
  {
    id: "oficial",
    name: "Dólar Oficial",
    value: 1160,
  },
  {
    id: "mep",
    name: "Dólar MEP",
    value: 1175,
  },
  {
    id: "ccl",
    name: "Dólar CCL",
    value: 1191,
  },
  {
    id: "cripto",
    name: "Dólar Cripto",
    value: 1207,
  },
]

interface DollarContextType {
  selectedDollar: string
  setSelectedDollar: (id: string) => void
  getCurrentDollarValue: () => number
}

const DollarContext = createContext<DollarContextType | undefined>(undefined)

export function DollarProvider({ children }: { children: ReactNode }) {
  const [selectedDollar, setSelectedDollar] = useState<string>("blue")

  const getCurrentDollarValue = () => {
    const dollar = dollarTypes.find((d) => d.id === selectedDollar)
    return dollar ? dollar.value : dollarTypes[0].value
  }

  return (
    <DollarContext.Provider value={{ selectedDollar, setSelectedDollar, getCurrentDollarValue }}>
      {children}
    </DollarContext.Provider>
  )
}

export function useDollar() {
  const context = useContext(DollarContext)
  if (context === undefined) {
    throw new Error("useDollar must be used within a DollarProvider")
  }
  return context
}
