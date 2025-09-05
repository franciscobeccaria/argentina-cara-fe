"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, MessageSquare, Plus, CheckCircle, AlertCircle } from "lucide-react"
import type { ContactSubmissionType } from "@/lib/types"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<ContactSubmissionType>({
    name: "",
    email: "", 
    productName: "",
    message: "",
    location: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - in reality this would send to an API
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setFormData({
      name: "",
      email: "", 
      productName: "",
      message: "",
      location: ""
    })
    onClose()
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Gracias por tu contribución!</h2>
            <p className="text-muted-foreground mb-6">
              Hemos recibido tu sugerencia. La revisaremos y si es apropiada, la añadiremos al índice.
            </p>
            <Button onClick={handleClose}>
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Contribuir al Índice
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Information Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm">
                  <p className="text-blue-900 font-medium">
                    ¿Qué tipo de productos buscamos?
                  </p>
                  <ul className="text-blue-800 space-y-1 ml-2">
                    <li>• Productos específicos con marcas reconocidas</li>
                    <li>• Comparaciones justas (mismo producto, misma calidad)</li>
                    <li>• Precios verificables en tiendas oficiales</li>
                    <li>• Ubicaciones específicas (ej: McDonald's Puerto Madero)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="productName">Producto/Servicio Sugerido *</Label>
              <Input
                id="productName"
                placeholder="ej: Big Mac McDonald's, iPhone 15 Apple Store, Netflix Premium"
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicaciones Específicas</Label>
              <Input
                id="location"
                placeholder="ej: McDonald's Obelisco vs McDonald's Times Square"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Detalles Adicionales *</Label>
              <Textarea
                id="message"
                rows={4}
                placeholder="Incluye precios que conoces, por qué consideras que esta comparación sería útil, fuentes de información, etc."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>

            {/* Example Suggestions */}
            <Card className="bg-slate-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Ejemplos de buenas sugerencias:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    Corte de pelo barbería promedio vs NYC
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Entrada cine IMAX Argentina vs Estados Unidos
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Suscripción Spotify vs otros países LATAM
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Pizza 8 porciones Ugis vs Domino's USA
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Enviar Sugerencia
              </Button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-slate-50 p-4 rounded-lg">
            <p>
              <strong>Nota:</strong> Todas las sugerencias son revisadas manualmente antes de ser incluidas en el índice. 
              Nos reservamos el derecho de modificar o rechazar sugerencias que no cumplan con nuestros criterios de calidad y precisión.
              Este proceso puede tomar algunos días.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}