import type { Metadata } from 'next'
import './globals.css'

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
      <body className="antialiased">{children}</body>
    </html>
  )
}
