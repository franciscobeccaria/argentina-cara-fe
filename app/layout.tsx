import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Argentina Dashboard - Comparación de Precios',
  description: 'Comparación de precios entre Argentina y otros países',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
