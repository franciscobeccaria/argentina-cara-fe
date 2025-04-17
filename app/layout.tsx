import type { Metadata } from 'next'
import './globals.css'
import { DollarProvider } from '@/lib/context/dollar-context'

export const metadata: Metadata = {
  title: 'Argentina Dashboard - Comparación de Precios',
  description: 'Comparación de precios entre Argentina, Chile, Brasil y EE.UU.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="antialiased"><DollarProvider>{children}</DollarProvider></body>
    </html>
  )
}
