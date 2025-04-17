"use client"

import { ReactNode } from "react"
import { DollarProvider } from "@/lib/context/dollar-context"
import { ReactQueryProvider } from "@/lib/query-client"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <DollarProvider>{children}</DollarProvider>
    </ReactQueryProvider>
  )
}
