"use client"

import { Card, CardContent } from "@/components/ui/card"
import ContributionModal from "@/components/contribution-modal"
import { 
  Globe, 
  TrendingUp, 
  Users, 
  Shield, 
  Github, 
  Twitter, 
  Mail,
  ExternalLink
} from "lucide-react"

interface ExtendedFooterProps {
  onSubmitContribution: (contribution: any) => void
}

export default function ExtendedFooter({ onSubmitContribution }: ExtendedFooterProps) {
  return (
    <div className="mt-16 space-y-8">
      {/* Main CTA Section */}
      <Card className="border-dashed border-blue-300 bg-blue-50">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Querés ayudar a mejorar el índice?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Cada precio que agregás nos ayuda a tener una visión más precisa de la realidad económica argentina. 
            Tu experiencia local es valiosa para toda la comunidad.
          </p>
          <ContributionModal onSubmit={onSubmitContribution} />
        </CardContent>
      </Card>

      {/* Project Description */}
      <Card>
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Sobre el Proyecto
              </h3>
              <p className="text-muted-foreground mb-4">
                <strong>¿Somos el País Más Caro del Mundo?</strong> nació de la necesidad de tener datos concretos 
                sobre el costo de vida argentino comparado con el resto del mundo.
              </p>
              <p className="text-muted-foreground mb-4">
                A través de scraping automatizado, contribuciones manuales y reportes de la comunidad, 
                creamos el índice más completo para que los argentinos puedan tomar decisiones económicas informadas.
              </p>
              <p className="text-muted-foreground">
                Desde decidir si conviene comprar en Miami hasta evaluar dónde vacacionar, 
                nuestro objetivo es democratizar el acceso a información económica real y verificable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Cómo Funciona
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Fuentes Verificables</h4>
                    <p className="text-sm text-muted-foreground">
                      Cada precio tiene una fuente: scraping automático, entrada manual con evidencia, 
                      o contribución comunitaria verificada.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Validación Comunitaria</h4>
                    <p className="text-sm text-muted-foreground">
                      La comunidad vota la utilidad de cada contribución, 
                      y nuestro equipo verifica los datos más importantes.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Comparaciones Globales</h4>
                    <p className="text-sm text-muted-foreground">
                      No solo comparamos con Estados Unidos: incluimos Europa, Chile, Brasil 
                      y otros mercados relevantes para argentinos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">10+</div>
            <div className="text-sm text-muted-foreground">Productos Comparados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-muted-foreground">Países Incluidos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">100%</div>
            <div className="text-sm text-muted-foreground">Fuentes Verificables</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-muted-foreground">Actualizaciones</div>
          </CardContent>
        </Card>
      </div>

      {/* Final Footer */}
      <footer className="border-t pt-8 pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 ¿Somos el País Más Caro del Mundo? - Datos para decisiones inteligentes
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a 
              href="mailto:contacto@somosmascaros.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Contacto"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}