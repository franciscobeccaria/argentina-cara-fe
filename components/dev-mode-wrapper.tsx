"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface DevModeWrapperProps {
  children: (isDevMode: boolean) => React.ReactNode
}

function DevModeContent({ children }: DevModeWrapperProps) {
  const searchParams = useSearchParams()
  const isDevMode = searchParams.get('dev') === 'true'
  
  return <>{children(isDevMode)}</>
}

export default function DevModeWrapper({ children }: DevModeWrapperProps) {
  return (
    <Suspense fallback={<div>{children(false)}</div>}>
      <DevModeContent>{children}</DevModeContent>
    </Suspense>
  )
}