"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  ExternalLink, 
  ThumbsUp, 
  ThumbsDown,
  Eye,
  Clock,
  User
} from "lucide-react"
import type { ContributionType } from "@/lib/types"
import { mockContributions } from "@/lib/data"

interface AdminPanelProps {
  contributions?: ContributionType[]
  onApprove?: (contributionId: number) => void
  onReject?: (contributionId: number) => void
}

export default function AdminPanel({ 
  contributions = mockContributions,
  onApprove,
  onReject 
}: AdminPanelProps) {
  const [selectedContributions, setSelectedContributions] = useState<number[]>([])
  const [viewingContribution, setViewingContribution] = useState<ContributionType | null>(null)

  const handleSelectContribution = (contributionId: number) => {
    setSelectedContributions(prev => 
      prev.includes(contributionId)
        ? prev.filter(id => id !== contributionId)
        : [...prev, contributionId]
    )
  }

  const handleBatchApprove = () => {
    selectedContributions.forEach(id => {
      if (onApprove) onApprove(id)
    })
    setSelectedContributions([])
  }

  const handleBatchReject = () => {
    selectedContributions.forEach(id => {
      if (onReject) onReject(id)
    })
    setSelectedContributions([])
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const pendingContributions = contributions.filter(c => c.status === "pending")
  const approvedCount = contributions.filter(c => c.status === "approved").length
  const rejectedCount = contributions.filter(c => c.status === "rejected").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Panel de Administración</h2>
          <p className="text-muted-foreground">
            Gestiona las contribuciones de la comunidad
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          <Shield className="w-4 h-4 mr-1" />
          Admin
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {pendingContributions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Esperando revisión
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rechazadas</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seleccionadas</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {selectedContributions.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Para acción en lote
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Batch Actions */}
      {selectedContributions.length > 0 && (
        <div className="flex gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <span className="text-sm text-blue-700 font-medium">
            {selectedContributions.length} contribución(es) seleccionada(s)
          </span>
          <div className="ml-auto flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleBatchApprove}
              className="text-green-700 border-green-300 hover:bg-green-50"
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Aprobar Todo
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleBatchReject}
              className="text-red-700 border-red-300 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-1" />
              Rechazar Todo
            </Button>
          </div>
        </div>
      )}

      {/* Contributions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contribuciones Pendientes</CardTitle>
          <CardDescription>
            Revisa y modera las contribuciones de la comunidad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedContributions.length === pendingContributions.length}
                    onChange={(e) => 
                      setSelectedContributions(
                        e.target.checked ? pendingContributions.map(c => c.id) : []
                      )
                    }
                  />
                </TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Precios</TableHead>
                <TableHead>Contribuidor</TableHead>
                <TableHead>Votos</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingContributions.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedContributions.includes(contribution.id)}
                      onChange={() => handleSelectContribution(contribution.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{contribution.productName}</div>
                      <Badge variant="outline" className="text-xs">
                        {contribution.category}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">
                        AR: {contribution.priceArgentinaCurrency} {contribution.priceArgentina}
                      </div>
                      <div className="text-muted-foreground">
                        US: USD {contribution.priceUSA}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contribution.contributorName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-green-600">
                        <ThumbsUp className="h-3 w-3" />
                        {contribution.votes.up}
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <ThumbsDown className="h-3 w-3" />
                        {contribution.votes.down}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(contribution.submittedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setViewingContribution(contribution)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Detalles de Contribución</DialogTitle>
                          </DialogHeader>
                          {viewingContribution && (
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Información del Producto</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Nombre:</span>
                                    <p className="font-medium">{viewingContribution.productName}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Categoría:</span>
                                    <p className="font-medium">{viewingContribution.category}</p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Precio Argentina:</span>
                                    <p className="font-medium">
                                      {viewingContribution.priceArgentinaCurrency} {viewingContribution.priceArgentina}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Precio EE.UU.:</span>
                                    <p className="font-medium">USD {viewingContribution.priceUSA}</p>
                                  </div>
                                </div>
                              </div>
                              
                              {viewingContribution.sourceUrl && (
                                <div>
                                  <span className="text-muted-foreground">Fuente:</span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <ExternalLink className="h-4 w-4" />
                                    <a 
                                      href={viewingContribution.sourceUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline"
                                    >
                                      {viewingContribution.sourceUrl}
                                    </a>
                                  </div>
                                </div>
                              )}

                              <div className="flex gap-2 pt-4">
                                <Button 
                                  onClick={() => {
                                    if (onApprove) onApprove(viewingContribution.id)
                                    setViewingContribution(null)
                                  }}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Aprobar
                                </Button>
                                <Button 
                                  variant="destructive"
                                  onClick={() => {
                                    if (onReject) onReject(viewingContribution.id)
                                    setViewingContribution(null)
                                  }}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Rechazar
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button 
                        size="sm" 
                        onClick={() => onApprove && onApprove(contribution.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onReject && onReject(contribution.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pendingContributions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No hay contribuciones pendientes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}