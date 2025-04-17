import type { ProductType, SummaryKpiType } from "./types"

// Real data for products
export const products: ProductType[] = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    priceArgentina: 1060,
    priceArgentinaCurreny: "USD",
    priceUSA: 1000,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-lineup-select-202409?wid=940&hei=1112&fmt=jpeg&qlt=90&.v=1718554600260",
    lastUpdated: "2025-04-16",
    brand: "Apple",
    category: "tecnologia",
  },
  {
    id: 2,
    name: "Nike Air Force 1",
    priceArgentina: 199999,
    priceArgentinaCurreny: "ARS",
    priceUSA: 115,
    image: "https://nikearprod.vtexassets.com/arquivos/ids/155413-1200-1200?width=1200&height=1200&aspect=true",
    lastUpdated: "2025-04-16",
    brand: "Nike",
    category: "ropa",
  },
  {
    id: 3,
    name: "10 Cápsulas Café Nespresso Colombia",
    priceArgentina: 20500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 9,
    image: "https://www.nespresso.com/ecom/medias/sys_master/public/16653527384094/colombia-2x.png?impolicy=small&imwidth=224&imdensity=1",
    lastUpdated: "2025-04-16",
    brand: "Nespresso",
    category: "gastronomia",
  },
  {
    id: 4,
    name: "Camiseta Aniversario Argentina",
    priceArgentina: 149999,
    priceArgentinaCurreny: "ARS",
    priceUSA: 100,
    image: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/cae76a03cc30414289c3c82a238ad6ed_9366/Camiseta_Aniversario_50_Anos_Seleccion_Argentina_Azul_JF0395_01_laydown.jpg",
    lastUpdated: "2025-04-16",
    brand: "Adidas",
    category: "ropa",
  },
]

// Mock data for summary KPIs
export const summaryKpis: SummaryKpiType[] = [
  {
    title: "Inflación percibida mensual",
    value: "12.8%",
    description: "Basada en variación de productos analizados",
    icon: "trending",
  },
  {
    title: "Cotización Dólar Blue",
    value: "$1,250",
    description: "+5.2% vs mes anterior",
    icon: "dollar",
  },
  {
    title: "Brecha cambiaria",
    value: "7.8%",
    description: "Diferencia entre oficial y blue",
    icon: "percentage",
  },
  {
    title: "Comparativa de ingresos",
    value: "10x",
    description: "Sueldo EE.UU. vs Argentina en USD",
    icon: "briefcase",
  },
]
