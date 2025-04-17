"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

export interface DollarType {
  id: string
  name: string
  value: number
  compra?: number
  fechaActualizacion?: string
}

// Valores iniciales por defecto en caso de que la API no responda
export const defaultDollarTypes: DollarType[] = [
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
    id: "bolsa",
    name: "Dólar MEP",
    value: 1175,
  },
  {
    id: "contadoconliqui",
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
  dollarTypes: DollarType[]
  isLoading: boolean
}

const DollarContext = createContext<DollarContextType | undefined>(undefined)

export function DollarProvider({ children }: { children: ReactNode }) {
  const [selectedDollar, setSelectedDollar] = useState<string>("blue")
  const [dollarTypes, setDollarTypes] = useState<DollarType[]>(defaultDollarTypes)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Cargar datos de la API
  useEffect(() => {
    const fetchDollarRates = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://dolarapi.com/v1/dolares')
        const data = await response.json()
        
        // Transformar los datos de la API al formato que necesitamos
        const formattedData: DollarType[] = data.map((item: any) => ({
          id: item.casa,
          name: item.nombre,
          value: item.venta,
          compra: item.compra,
          fechaActualizacion: item.fechaActualizacion
        }))
        
        setDollarTypes(formattedData)
      } catch (error) {
        console.error('Error fetching dollar rates:', error)
        // En caso de error, usamos los valores por defecto
        setDollarTypes(defaultDollarTypes)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDollarRates()
  }, [])

  const getCurrentDollarValue = () => {
    const dollar = dollarTypes.find((d) => d.id === selectedDollar)
    return dollar ? dollar.value : dollarTypes[0]?.value || 1250 // Valor por defecto si no hay datos
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
  if (context === undefined) {
    throw new Error("useDollar must be used within a DollarProvider")
  }
  return context
}
