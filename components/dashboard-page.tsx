"use client"

import { useState } from "react"
import { useDollar } from "@/lib/context/dollar-context"
import { DollarSign, ShoppingBag, TrendingUp, Coffee, Briefcase, Percent, ChevronDown, MessageSquare, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ProductCard from "@/components/product-card"
import DollarSelector from "@/components/dollar-selector"
import ComparisonCards from "@/components/comparison-cards"
import ContactForm from "@/components/contact-form"
import { comparisonMessages, commonQuestions } from "@/lib/data"

export default function DashboardPage({ products, summaryKpis }) {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const { getCurrentDollarValue } = useDollar()

  const avgPriceDiffPercentage = products.reduce((acc, product) => {
    const isPriceInUSD = product.priceArgentinaCurreny === "USD"
    const dollarValue = getCurrentDollarValue()
    const priceInUSD = isPriceInUSD ? product.priceArgentina : product.priceArgentina / dollarValue
    const priceInARS = isPriceInUSD ? product.priceArgentina * dollarValue : product.priceArgentina
    const priceDiff = priceInUSD - product.priceUSA
    const percentageDiff = (priceDiff / product.priceUSA) * 100
    return acc + percentageDiff
  }, 0) / products.length

  const formattedAvgPriceDiffPercentage = avgPriceDiffPercentage.toFixed(2)
  const isMoreExpensive = avgPriceDiffPercentage > 0
  const statusText = isMoreExpensive
    ? `Argentina está más cara en promedio`
    : `Argentina está más barata en promedio`

  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section - 85% of viewport height */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center relative">
        <div className="container mx-auto px-4 text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            ¿Argentina está cara en dólares?
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Un índice visual de productos específicos que compara precios reales entre Argentina y el mundo
          </p>

          {/* Main Index Display */}
          <Card className={`mx-auto mb-8 max-w-lg ${isMoreExpensive ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"} shadow-2xl`}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl md:text-3xl">Índice de Valor Relativo</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Basado en {products.length} productos específicos comparados internacionalmente
              </p>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className={`text-7xl md:text-8xl font-bold mb-4 ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>
                {formattedAvgPriceDiffPercentage}%
              </div>
              <p className={`text-lg md:text-xl font-medium ${isMoreExpensive ? "text-red-600" : "text-green-600"}`}>
                {statusText}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                vs Estados Unidos • Actualizado diariamente
              </p>
            </CardContent>
          </Card>

          <DollarSelector />
        </div>

        {/* Scroll indicator */}
        <Button 
          variant="ghost" 
          size="lg" 
          className="absolute bottom-8 animate-bounce"
          onClick={scrollToProducts}
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Productos Analizados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comparamos precios específicos de marcas reconocidas en ubicaciones reales
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Cards Section */}
      <ComparisonCards 
        comparisons={comparisonMessages} 
        onContactClick={() => setIsContactFormOpen(true)}
      />

      {/* Summary KPIs Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Indicadores Económicos Clave
            </h2>
            <p className="text-lg text-muted-foreground">
              Métricas complementarias para entender el panorama económico
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summaryKpis.map((kpi, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  {kpi.icon === "dollar" && <DollarSign className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "shopping" && <ShoppingBag className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "trending" && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "coffee" && <Coffee className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "percentage" && <Percent className="h-4 w-4 text-muted-foreground" />}
                  {kpi.icon === "briefcase" && <Briefcase className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-2">
              <HelpCircle className="h-8 w-8" />
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Las consultas más comunes sobre comparaciones de precios entre países
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {commonQuestions.map((question) => (
                <AccordionItem 
                  key={question.id} 
                  value={`item-${question.id}`}
                  className="border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">
                          {question.id}
                        </span>
                      </div>
                      <span className="font-medium">
                        {question.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-11 pr-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {question.answer}
                    </p>
                    {question.comparison && (
                      <div className="mt-3">
                        <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">
                          Comparación: {question.comparison}
                        </span>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Sobre el Proyecto</h3>
            <div className="max-w-4xl mx-auto text-muted-foreground space-y-4">
              <p>
                Este índice surge de la necesidad de tener una referencia clara y específica sobre el costo de vida en Argentina comparado con otros países. A diferencia de otros índices generales, nos enfocamos en productos y servicios específicos de marcas reconocidas.
              </p>
              <p>
                Cada comparación utiliza precios reales de tiendas oficiales y ubicaciones específicas. Por ejemplo, comparamos el precio de un Big Mac en McDonald's Puerto Madero vs Times Square NYC, o el costo de unas Nike Air Force 1 en la tienda oficial de cada país.
              </p>
              <p>
                Los datos se actualizan regularmente y incluyen la metodología de recolección para cada producto. Nuestro objetivo es brindar transparencia sobre el verdadero costo de vida argentino en dólares.
              </p>
            </div>
            
            {/* Contact CTA */}
            <div className="mt-8 mb-8">
              <h4 className="text-xl font-bold mb-4">¿Quieres contribuir?</h4>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Si conoces productos específicos que deberíamos incluir en nuestro análisis, 
                o tienes información sobre precios actualizados, nos encantaría escuchar tu sugerencia.
              </p>
              <Button 
                onClick={() => setIsContactFormOpen(true)}
                className="bg-white text-slate-900 hover:bg-slate-100"
                size="lg"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Sugerir Producto
              </Button>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-sm text-slate-400">
              © 2025 Índice Argentina. Todos los datos son referenciales y se actualizan periódicamente.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </div>
  )
}
