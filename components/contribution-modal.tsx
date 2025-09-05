"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload, DollarSign, Link as LinkIcon } from "lucide-react"
import type { CategoryType } from "@/lib/types"

interface ContributionModalProps {
  onSubmit?: (contribution: ContributionFormData) => void
  variant?: "default" | "subtle"
}

interface ContributionFormData {
  productName: string
  priceArgentina: number
  priceArgentinaCurrency: "USD" | "ARS"
  priceUSA: number
  category: CategoryType
  sourceUrl: string
  contributorName: string
  notes?: string
}

const categoryOptions = [
  { value: "tech" as CategoryType, label: "Tecnología" },
  { value: "food" as CategoryType, label: "Gastronomía" },
  { value: "fashion" as CategoryType, label: "Moda" },
  { value: "home" as CategoryType, label: "Hogar" },
  { value: "cars" as CategoryType, label: "Autos" },
  { value: "other" as CategoryType, label: "Otros" },
]

export default function ContributionModal({ onSubmit, variant = "default" }: ContributionModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<ContributionFormData>({
    productName: "",
    priceArgentina: 0,
    priceArgentinaCurrency: "ARS",
    priceUSA: 0,
    category: "other",
    sourceUrl: "",
    contributorName: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    // Reset form
    setFormData({
      productName: "",
      priceArgentina: 0,
      priceArgentinaCurrency: "ARS",
      priceUSA: 0,
      category: "other",
      sourceUrl: "",
      contributorName: "",
      notes: "",
    })
    setOpen(false)
  }

  const updateFormData = (field: keyof ContributionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.productName && 
                     formData.priceArgentina > 0 && 
                     formData.priceUSA > 0 &&
                     formData.sourceUrl &&
                     formData.contributorName

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === "subtle" ? (
          <Button variant="outline" size="sm" className="text-sm">
            <Plus className="h-4 w-4 mr-2" />
            Contribuir producto
          </Button>
        ) : (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Contribuir Nuevo Producto</DialogTitle>
          <DialogDescription>
            Ayuda a mejorar nuestro índice agregando precios que hayas encontrado. 
            Tu contribución será revisada por la comunidad.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Product Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Producto
              </Label>
              <Input
                id="productName"
                placeholder="ej. iPhone 16 Pro, Nike Air Force 1..."
                className="col-span-3"
                value={formData.productName}
                onChange={(e) => updateFormData("productName", e.target.value)}
                required
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoría
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => updateFormData("category", value as CategoryType)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Argentina Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priceArgentina" className="text-right">
                Precio Argentina
              </Label>
              <div className="col-span-3 flex gap-2">
                <Select 
                  value={formData.priceArgentinaCurrency}
                  onValueChange={(value) => updateFormData("priceArgentinaCurrency", value)}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ARS">ARS</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="priceArgentina"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="flex-1"
                  value={formData.priceArgentina || ""}
                  onChange={(e) => updateFormData("priceArgentina", parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            {/* USA Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priceUSA" className="text-right">
                Precio EE.UU.
              </Label>
              <div className="col-span-3 flex gap-2">
                <div className="flex items-center text-sm text-muted-foreground w-20">
                  <DollarSign className="h-4 w-4 mr-1" />
                  USD
                </div>
                <Input
                  id="priceUSA"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="flex-1"
                  value={formData.priceUSA || ""}
                  onChange={(e) => updateFormData("priceUSA", parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            {/* Source URL */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sourceUrl" className="text-right">
                Fuente
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex gap-2">
                  <LinkIcon className="h-4 w-4 mt-3 text-muted-foreground" />
                  <Input
                    id="sourceUrl"
                    type="url"
                    placeholder="https://ejemplo.com/producto"
                    className="flex-1"
                    value={formData.sourceUrl}
                    onChange={(e) => updateFormData("sourceUrl", e.target.value)}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Link verificable donde se puede ver el precio
                </p>
              </div>
            </div>

            {/* Contributor Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contributorName" className="text-right">
                Tu Nombre
              </Label>
              <Input
                id="contributorName"
                placeholder="Tu nombre o alias"
                className="col-span-3"
                value={formData.contributorName}
                onChange={(e) => updateFormData("contributorName", e.target.value)}
                required
              />
            </div>

            {/* Optional Notes */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right pt-2">
                Notas
              </Label>
              <Textarea
                id="notes"
                placeholder="Información adicional (opcional)"
                className="col-span-3"
                rows={2}
                value={formData.notes}
                onChange={(e) => updateFormData("notes", e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={!isFormValid}
            >
              Contribuir Producto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}