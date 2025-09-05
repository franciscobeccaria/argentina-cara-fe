import type { ProductType, SummaryKpiType, ComparisonMessageType, CommonQuestionType } from "./types"

// Comprehensive data for 25 specific products across categories
export const products: ProductType[] = [
  // Technology
  {
    id: 1,
    name: "iPhone 16 Pro",
    priceArgentina: 1060,
    priceArgentinaCurreny: "USD",
    priceUSA: 1000,
    priceChile: 1150,
    priceBrazil: 1200,
    priceEurope: 1100,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-lineup-select-202409?wid=940&hei=1112&fmt=jpeg&qlt=90&.v=1718554600260",
    lastUpdated: "2025-04-16",
    brand: "Apple",
    category: "tecnologia",
    location: "Apple Store Argentina vs Apple Store USA",
    description: "128GB, Natural Titanium",
    methodology: "Precios oficiales de Apple Store en cada país",
    sources: {
      argentina: {
        url: "https://www.apple.com/ar/iphone-16-pro/",
        storeName: "Apple Store Argentina",
        verified: true
      },
      usa: {
        url: "https://www.apple.com/us/iphone-16-pro/",
        storeName: "Apple Store USA",
        verified: true
      },
      chile: {
        url: "https://www.apple.com/cl/iphone-16-pro/",
        storeName: "Apple Store Chile",
        verified: true
      }
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    priceArgentina: 850,
    priceArgentinaCurreny: "USD",
    priceUSA: 800,
    priceChile: 825,
    priceBrazil: 900,
    image: "https://images.samsung.com/is/image/samsung/p6pim/ar/2401/gallery/ar-galaxy-s24-s921-sm-s921bzkaaro-539573957",
    lastUpdated: "2025-04-16",
    brand: "Samsung",
    category: "tecnologia",
    location: "Samsung Store Argentina vs Best Buy USA",
    description: "128GB, Onyx Black",
    methodology: "Precios oficiales de tiendas autorizadas",
    sources: {
      argentina: {
        url: "https://www.samsung.com/ar/smartphones/galaxy-s24/",
        storeName: "Samsung Argentina",
        verified: true
      },
      usa: {
        url: "https://www.bestbuy.com/site/samsung-galaxy-s24/",
        storeName: "Best Buy USA",
        verified: true
      }
    }
  },
  {
    id: 3,
    name: "MacBook Air M2",
    priceArgentina: 1200,
    priceArgentinaCurreny: "USD",
    priceUSA: 1099,
    priceEurope: 1249,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606",
    lastUpdated: "2025-04-16",
    brand: "Apple",
    category: "tecnologia",
    location: "Apple Store Argentina vs Apple Store USA",
    description: "13 pulgadas, 256GB SSD, 8GB RAM",
    methodology: "Precios de Apple Store oficial"
  },
  // Food & Restaurants
  {
    id: 4,
    name: "Big Mac - McDonald's",
    priceArgentina: 8500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 5.5,
    priceChile: 4.2,
    priceBrazil: 3.8,
    priceEurope: 4.8,
    image: "https://s7d1.scene7.com/is/image/mcdonalds/DC_202201_0003-999_BigMac_1564x1564",
    lastUpdated: "2025-04-16",
    brand: "McDonald's",
    category: "gastronomia",
    location: "McDonald's Puerto Madero vs Times Square NYC",
    description: "Combo Big Mac con papas medianas y bebida",
    methodology: "Precios promedio en locales céntricos de cada ciudad"
  },
  {
    id: 5,
    name: "Latte - Starbucks",
    priceArgentina: 4500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 5.2,
    priceChile: 3.8,
    priceEurope: 4.5,
    image: "https://globalassets.starbucks.com/digitalassets/products/bev/SBX20190617_CaffeLatte.jpg",
    lastUpdated: "2025-04-16",
    brand: "Starbucks",
    category: "gastronomia",
    location: "Starbucks Recoleta vs Starbucks Manhattan",
    description: "Latte 12oz (Tall)",
    methodology: "Precios en tiendas Starbucks de zonas premium"
  },
  {
    id: 6,
    name: "Pizza Muzzarella - Guerrín",
    priceArgentina: 12000,
    priceArgentinaCurreny: "ARS",
    priceUSA: 18,
    priceEurope: 15,
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0c/7a/b8/4a/pizza-de-muzzarella.jpg",
    lastUpdated: "2025-04-16",
    brand: "Guerrín vs Joe's Pizza",
    category: "gastronomia",
    location: "Guerrín Corrientes vs Joe's Pizza NYC",
    description: "Porción de pizza muzzarella",
    methodology: "Pizza típica de cada ciudad, porciones equivalentes"
  },
  // Retail & Fashion
  {
    id: 7,
    name: "Nike Air Force 1",
    priceArgentina: 199999,
    priceArgentinaCurreny: "ARS",
    priceUSA: 115,
    priceChile: 140,
    priceBrazil: 160,
    priceEurope: 120,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
    lastUpdated: "2025-04-16",
    brand: "Nike",
    category: "ropa",
    location: "Nike Store Argentina vs Nike.com USA",
    description: "Talle 42, color blanco clásico",
    methodology: "Precios oficiales Nike en cada país"
  },
  {
    id: 8,
    name: "Camiseta Adidas Originals",
    priceArgentina: 89999,
    priceArgentinaCurreny: "ARS",
    priceUSA: 35,
    priceChile: 42,
    priceBrazil: 55,
    priceEurope: 40,
    image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8e70c8769e8e4220b52cad7700c2e4de_9366/Camiseta_Adicolor_Classics_Trefoil_Blanco_H06642_01_laydown.jpg",
    lastUpdated: "2025-04-16",
    brand: "Adidas",
    category: "ropa",
    location: "Adidas Store Buenos Aires vs Adidas USA",
    description: "Camiseta Trefoil básica, talle M",
    methodology: "Precios oficiales Adidas por país"
  },
  {
    id: 9,
    name: "Remera Básica - Avellaneda",
    priceArgentina: 15000,
    priceArgentinaCurreny: "ARS",
    priceUSA: 8,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvX0XJQaLqzUOqXY8lFZQ8sUU5qPZoQ6Lfw&s",
    lastUpdated: "2025-04-16",
    brand: "Avellaneda vs Shein",
    category: "ropa",
    location: "Avellaneda vs Shein online",
    description: "Remera básica algodón, calidad media",
    methodology: "Promedio Avellaneda vs precio Shein + envío"
  },
  {
    id: 10,
    name: "Jeans Levi's 501",
    priceArgentina: 180000,
    priceArgentinaCurreny: "ARS",
    priceUSA: 70,
    priceChile: 85,
    priceEurope: 90,
    image: "https://lsco.scene7.com/is/image/lsco/005010000-front-pdp-levi",
    lastUpdated: "2025-04-16",
    brand: "Levi's",
    category: "ropa",
    location: "Levi's Argentina vs Levi's USA",
    description: "Jeans 501 Original Fit, talle 32x32",
    methodology: "Precios oficiales Levi's por región"
  },
  // Services
  {
    id: 11,
    name: "Viaje Uber 5km",
    priceArgentina: 4500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 15,
    priceChile: 8,
    priceBrazil: 6,
    priceEurope: 12,
    image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1684855112/assets/96/4dd3d1-94e3-4f24-9a5e-6e5b6d83dd80/original/UberX.png",
    lastUpdated: "2025-04-16",
    brand: "Uber",
    category: "servicios",
    location: "CABA vs Manhattan",
    description: "Viaje 5km en horario normal",
    methodology: "Tarifas Uber promedio sin surge pricing"
  },
  {
    id: 12,
    name: "Netflix Premium",
    priceArgentina: 7000,
    priceArgentinaCurreny: "ARS",
    priceUSA: 23,
    priceChile: 14,
    priceBrazil: 18,
    priceEurope: 18,
    image: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/logo.png",
    lastUpdated: "2025-04-16",
    brand: "Netflix",
    category: "servicios",
    location: "Suscripción local por país",
    description: "Plan Premium 4K, mensual",
    methodology: "Precios oficiales Netflix por región"
  },
  {
    id: 13,
    name: "Spotify Premium",
    priceArgentina: 2500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 11,
    priceChile: 6,
    priceBrazil: 8,
    priceEurope: 10,
    image: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    lastUpdated: "2025-04-16",
    brand: "Spotify",
    category: "servicios",
    location: "Suscripción local por país",
    description: "Plan Individual Premium, mensual",
    methodology: "Precios oficiales Spotify por región"
  },
  // Supermarket Items
  {
    id: 14,
    name: "Coca-Cola 500ml",
    priceArgentina: 1800,
    priceArgentinaCurreny: "ARS",
    priceUSA: 2.5,
    priceChile: 1.8,
    priceBrazil: 1.5,
    priceEurope: 2.2,
    image: "https://www.coca-cola.com/content/dam/onexp/gt/es/brands/coca-cola/coca-cola-original-500ml-bottle-guatemala.jpg",
    lastUpdated: "2025-04-16",
    brand: "Coca-Cola",
    category: "supermercado",
    location: "Supermercado promedio por país",
    description: "Botella 500ml refrigerada",
    methodology: "Precio promedio en supermercados de cada país"
  },
  {
    id: 15,
    name: "Pan Lactal Bimbo",
    priceArgentina: 3200,
    priceArgentinaCurreny: "ARS",
    priceUSA: 3.5,
    priceChile: 2.2,
    priceBrazil: 2.8,
    image: "https://www.bimbo.com.ar/sites/default/files/productos/2019-12/pan-lactal-grande-bimbo.png",
    lastUpdated: "2025-04-16",
    brand: "Bimbo",
    category: "supermercado",
    location: "Supermercado promedio",
    description: "Pan lactal grande 680g",
    methodology: "Precio promedio pan de molde marca líder por país"
  },
  {
    id: 16,
    name: "Leche Entera 1L",
    priceArgentina: 1500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 4.2,
    priceChile: 1.8,
    priceBrazil: 2.1,
    priceEurope: 1.5,
    image: "https://jumboargentina.vtexassets.com/arquivos/ids/199504-800-800?width=800&height=800&aspect=true",
    lastUpdated: "2025-04-16",
    brand: "La Serenísima",
    category: "supermercado",
    location: "Supermercado promedio",
    description: "Leche entera 1 litro",
    methodology: "Precio promedio leche marca líder por país"
  },
  // Coffee & Food Items
  {
    id: 17,
    name: "10 Cápsulas Café Nespresso",
    priceArgentina: 20500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 9,
    priceEurope: 8.5,
    priceChile: 12,
    image: "https://www.nespresso.com/ecom/medias/sys_master/public/16653527384094/colombia-2x.png",
    lastUpdated: "2025-04-16",
    brand: "Nespresso",
    category: "gastronomia",
    location: "Nespresso Store por país",
    description: "Colombia Master Origin, 10 cápsulas",
    methodology: "Precios oficiales Nespresso por país"
  },
  {
    id: 18,
    name: "Café Cortado - Café Local",
    priceArgentina: 2800,
    priceArgentinaCurreny: "ARS",
    priceUSA: 4.5,
    priceEurope: 2.8,
    priceChile: 2.2,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZQqW3yN3wK0OxMXvJ4pHQ8GgWqXoA5VlQmw&s",
    lastUpdated: "2025-04-16",
    brand: "Café Local",
    category: "gastronomia",
    location: "Café de barrio promedio por ciudad",
    description: "Café cortado tradicional",
    methodology: "Promedio cafés locales en zona céntrica"
  },
  // Additional Items
  {
    id: 19,
    name: "Corte de Pelo - Barbería",
    priceArgentina: 12000,
    priceArgentinaCurreny: "ARS",
    priceUSA: 35,
    priceEurope: 28,
    priceChile: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvKq8b9w0ZNO9XQn5rZx8u1KbMjGQKgv2BA&s",
    lastUpdated: "2025-04-16",
    brand: "Barbería Local",
    category: "servicios",
    location: "Barbería promedio zona céntrica",
    description: "Corte de pelo masculino básico",
    methodology: "Precio promedio barberías en zona céntrica"
  },
  {
    id: 20,
    name: "Entrada Cine Premium",
    priceArgentina: 8500,
    priceArgentinaCurreny: "ARS",
    priceUSA: 18,
    priceEurope: 15,
    priceChile: 12,
    priceBrazil: 10,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7VQvX4YQqM8PYW2bwmJG5HQbWKxRQLmK2Pw&s",
    lastUpdated: "2025-04-16",
    brand: "Cinemark/AMC",
    category: "servicios",
    location: "Cine premium shopping center",
    description: "Entrada 2D función tarde fin de semana",
    methodology: "Precio promedio cines premium por país"
  }
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

// Comparison messages data for engaging cards
export const comparisonMessages: ComparisonMessageType[] = [
  {
    id: 1,
    title: "El café que te despierta... y tu billetera",
    message: "Un café cortado en Buenos Aires está USD 2.8 vs USD 4.5 que sale en Nueva York",
    argentinaDifference: "38% más barato",
    comparison: "usa",
    category: "food"
  },
  {
    id: 2,
    title: "Netflix: binge-watching a precio argentino",
    message: "Netflix Premium en Argentina cuesta USD 7 vs USD 23 en Estados Unidos",
    argentinaDifference: "70% más barato",
    comparison: "usa",
    category: "lifestyle"
  },
  {
    id: 3,
    title: "Pizza: Buenos Aires vs New York",
    message: "Una porción de pizza en Guerrín sale USD 12 vs USD 18 en Joe's Pizza NYC",
    argentinaDifference: "33% más barato",
    comparison: "usa",
    category: "food"
  },
  {
    id: 4,
    title: "Uber: moverse por la ciudad",
    message: "Un viaje de 5km en CABA cuesta USD 4.5 vs USD 15 en Manhattan",
    argentinaDifference: "70% más barato",
    comparison: "usa",
    category: "services"
  },
  {
    id: 5,
    title: "iPhone: tecnología a precio premium",
    message: "Un iPhone 16 Pro en Argentina cuesta USD 1060 vs USD 1000 en Estados Unidos",
    argentinaDifference: "6% más caro",
    comparison: "usa",
    category: "technology"
  },
  {
    id: 6,
    title: "Starbucks: el lujo cafetero",
    message: "Un Latte en Starbucks Recoleta sale USD 4.5 vs USD 3.8 en Santiago de Chile",
    argentinaDifference: "18% más caro",
    comparison: "chile",
    category: "food"
  },
  {
    id: 7,
    title: "Nike: corriendo hacia el precio",
    message: "Unas Nike Air Force 1 en Argentina cuestan USD 200 vs USD 140 en Chile",
    argentinaDifference: "43% más caro",
    comparison: "chile",
    category: "retail"
  },
  {
    id: 8,
    title: "Big Mac Index actualizado",
    message: "Un combo Big Mac en Buenos Aires cuesta USD 8.5 vs USD 3.8 en São Paulo",
    argentinaDifference: "124% más caro",
    comparison: "brazil",
    category: "food"
  }
]

// Common questions about price comparisons
export const commonQuestions: CommonQuestionType[] = [
  {
    id: 1,
    question: "¿Conviene comprar ropa en Miami?",
    answer: "Según nuestros datos, la ropa de marca como Nike y Adidas es 30-40% más barata en Miami que en Argentina. Un viaje de compras puede justificarse si planeas gastar más de USD 800.",
    category: "shopping",
    comparison: "usa"
  },
  {
    id: 2,
    question: "¿Conviene irse de vacaciones a Brasil vs la costa argentina?",
    answer: "Brasil resulta 20-30% más económico en comida y servicios. Sin embargo, el alojamiento puede ser similar. La diferencia real está en actividades y entretenimiento.",
    category: "travel",
    comparison: "brazil"
  },
  {
    id: 3,
    question: "¿Cuánto sale alquilar en Buenos Aires vs Madrid?",
    answer: "Un departamento en zona premium de CABA cuesta USD 800-1200 vs USD 1200-1800 en Madrid centro. Buenos Aires sigue siendo más económico, pero la brecha se achica.",
    category: "housing",
    comparison: "europe"
  },
  {
    id: 4,
    question: "¿Vale la pena comprar tecnología en Chile?",
    answer: "La electrónica en Chile es 5-15% más barata que en Argentina. La diferencia no siempre justifica el viaje, salvo para compras grandes como notebooks o celulares.",
    category: "shopping",
    comparison: "chile"
  },
  {
    id: 5,
    question: "¿Los servicios digitales son más baratos en Argentina?",
    answer: "Sí, servicios como Netflix, Spotify y Uber son significativamente más baratos en Argentina (50-70%) comparado con otros países de la región.",
    category: "lifestyle",
    comparison: "usa"
  },
  {
    id: 6,
    question: "¿La gastronomía argentina es competitiva internacionalmente?",
    answer: "La comida local (pizza, café, parrilla) mantiene precios muy competitivos. Sin embargo, las franquicias internacionales como McDonald's pueden ser más caras.",
    category: "lifestyle",
    comparison: "usa"
  }
]
