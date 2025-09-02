# Dashboard Argentina

Una aplicación web que compara precios de productos entre Argentina, Chile, Brasil y EE.UU. para analizar el poder adquisitivo y visualizar las diferencias en el valor del dólar.

## 📋 Estado del Proyecto

**Fase Actual:** Desarrollo brownfield con migración arquitectónica planificada  
**Visión:** Evolucionar de un comparador de precios simple a una plataforma de índice económico dinámico con contribuciones comunitarias y análisis granular por categorías.

### Roadmap de Desarrollo

- ✅ **Fase 1 (Actual):** Aplicación Next.js básica con scraping automatizado
- 🚧 **Fase 2 (En planificación):** Sistema híbrido con contribuciones de usuarios y migración a PostgreSQL
- 📋 **Fase 3 (Futuro):** Índices dinámicos por categorías con análisis histórico

**Documentación completa:** Ver `docs/prd.md` para especificaciones técnicas detalladas del enhancement brownfield.

---

## 🎯 Características Actuales

### Frontend (Aplicación Web)
- **Comparación de precios** de productos populares entre países
- **Análisis del poder adquisitivo** con indicadores económicos
- **Visualización** de diferencias en el valor del dólar
- **Panel de indicadores** económicos en tiempo real
- **Diseño responsive** con soporte para tema oscuro/claro
- **Interfaz moderna** con componentes Radix UI

### Backend (Sistema de Scraping)
- **Scraping automatizado** de sitios Nike y Adidas
- **Integración con APIs** de tipos de cambio (dolarapi.com)
- **Almacenamiento** estructurado en Supabase con JSONB
- **Capturas de pantalla** automáticas para verificación
- **Ejecución programada** via GitHub Actions

---

## 🛠 Stack Tecnológico

### Frontend
- **Framework:** Next.js 15.2.4 con React 19
- **Styling:** Tailwind CSS 3.4.17 + Radix UI
- **State Management:** TanStack React Query 5.74.4 + React Context
- **Icons:** Lucide React
- **Charts:** Recharts para visualización de datos
- **Themes:** next-themes para modo oscuro/claro

### Backend (Repositorio Separado)
- **Lenguaje:** Python 3.8+
- **Automation:** Playwright para web scraping
- **Database:** Supabase (actual) → PostgreSQL local (planeado)
- **APIs:** Integración con dolarapi.com para tipos de cambio
- **Deploy:** GitHub Actions para ejecución programada

---

## 📦 Productos Comparados

### Productos Actuales
- **Tecnología:** iPhone, MacBook (datos de ejemplo)
- **Moda:** Nike Air Force 1, Argentina Anniversary Jersey
- **Consumo:** Café, productos básicos (en expansión)

### Productos Scraped Activos
- **Nike Air Force 1:** US vs Argentina con precios en tiempo real
- **Argentina Anniversary Jersey (Adidas):** Comparación internacional
- **Tipos de cambio:** Oficial, blue, CCL, crypto desde múltiples fuentes

---

## 🚀 Comenzando

### Prerrequisitos
- Node.js 18+
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone [repository-url]
cd argentina-cara-fe

# Instalar dependencias
npm install
# o
pnpm install

# Ejecutar el servidor de desarrollo
npm run dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

### Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal con providers
│   ├── page.tsx           # Dashboard principal
│   ├── globals.css        # Estilos globales
│   └── api/               # API Routes
├── components/            # Componentes React
│   ├── dashboard-page.tsx # Componente principal del dashboard
│   ├── product-card.tsx   # Tarjeta individual de producto
│   ├── dollar-selector.tsx# Selector de moneda
│   └── ui/                # Biblioteca de componentes Radix UI
├── lib/                   # Utilidades y configuración
│   ├── types.ts          # Definiciones de tipos TypeScript
│   ├── utils.ts          # Funciones de utilidad
│   └── context/          # Contextos de React
└── docs/                  # Documentación del proyecto
    └── prd.md            # Product Requirements Document
```

---

## 🔮 Futuro: Enhancement Brownfield

### Migración Arquitectónica Planificada

**Objetivo:** Transformar la aplicación en un índice económico dinámico y confiable con participación comunitaria.

#### Cambios Principales:
1. **Database Migration:** Supabase → PostgreSQL local para control completo
2. **Sistema Híbrido:** Scraping + Entrada manual + Contribuciones de usuarios
3. **Índices Dinámicos:** Cálculos por categoría (Tech, Food, Fashion, Home, Cars)
4. **Control de Calidad:** Sistema de votación con fingerprinting + verificación admin

#### Nueva Arquitectura de Datos:
```
Fuentes de Datos (Jerarquía de Confianza):
1. Datos Verificados por Admin (máxima confianza)
2. Scraping Automatizado (confianza media, alta confiabilidad)
3. Contribuciones Verificadas de Usuarios (confianza media, validadas por comunidad)
4. Contribuciones Sin Verificar (baja confianza, pendientes de validación)
```

#### Nuevas Funcionalidades:
- **Contribución Anónima:** Los usuarios pueden agregar productos/precios sin registro
- **Sistema de Votación:** Control de calidad comunitario con browser fingerprinting
- **Panel de Admin:** Interfaz simple para verificar/rechazar contribuciones
- **Índices por Categoría:** "Tech +65% caro, Fashion -8% barato vs USA"
- **Transparencia de Fuentes:** Enlaces verificables a fuentes originales
- **Análisis Histórico:** Tracking de tendencias y evolución de precios

#### Ejemplo de Índice Dinámico:
```
🇦🇷 vs 🇺🇸 | Actualizado hace 3 horas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GENERAL: +47% 🔴

CATEGORÍAS:
💻 Tech      ████████████ +65% 🔴
🍕 Food      ███          +12% 🟡  
👕 Fashion   ██           -8%  🟢 ← MEJOR DEAL
🏠 Home      █████        +23% 🟠
🚗 Cars      ██████████   +89% 🔴

💡 Insight: Ropa es 8% más barata que USA
```

---

## 📊 Datos y APIs

### Estructura de Datos Actual
```json
{
  "product_id": "nike-air-force-1",
  "data": {
    "AR": {
      "value": 199.999,
      "source": "https://nike.com.ar/...",
      "currency": "ARS"
    },
    "US": {
      "value": 115.0,
      "source": "https://nike.com/...",
      "currency": "USD"
    },
    "exchange_rates": [
      {
        "moneda": "USD",
        "casa": "oficial",
        "compra": 1110,
        "venta": 1160
      }
    ]
  }
}
```

### APIs Integradas
- **dolarapi.com:** Tipos de cambio en tiempo real (oficial, blue, CCL, crypto)
- **Supabase:** Base de datos actual con almacenamiento JSONB
- **Internal API:** Endpoints para revalidation y gestión de cache

---

## 🔧 Desarrollo

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run start    # Servidor de producción
npm run lint     # Linter ESLint
```

### Variables de Entorno
```bash
# Frontend (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Backend (repositorio separado)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
SAVE_TO_SUPABASE=true
```

### Contribución
1. Fork del repositorio
2. Crear branch de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

---

## 📈 Roadmap y Próximos Pasos

### Fase 2: Sistema Híbrido (Q1 2025)
- [ ] **Database Migration:** Migrar de Supabase a PostgreSQL local
- [ ] **User Contributions:** Sistema de contribución anónima de productos
- [ ] **Voting System:** Control de calidad con browser fingerprinting
- [ ] **Admin Panel:** Panel de verificación y moderación

### Fase 3: Índices Dinámicos (Q2 2025)
- [ ] **Category System:** Organización por categorías con índices independientes
- [ ] **Dynamic Indices:** Cálculos en tiempo real por categoría
- [ ] **Source Transparency:** Verificación completa de fuentes con enlaces
- [ ] **Historical Tracking:** Análisis de tendencias y evolución histórica

### Fase 4: Funcionalidades Avanzadas (Q3-Q4 2025)
- [ ] **Geographic Expansion:** Chile, Brasil, y mercados europeos
- [ ] **Mobile App:** Aplicaciones nativas iOS/Android
- [ ] **API Pública:** API para investigadores y desarrolladores
- [ ] **Advanced Analytics:** Machine learning para predicción de precios

---

## 🤝 Equipo y Contacto

### Mantenedores
- **Product Manager:** Desarrollo de estrategia y roadmap
- **Developer:** Implementación frontend y arquitectura
- **Data Engineer:** Sistema de scraping y gestión de datos

### Documentación Técnica
- **PRD Completo:** `docs/prd.md` - Especificaciones técnicas detalladas
- **User Stories:** 7 historias de usuario con criterios de aceptación
- **Architecture:** Migración de Supabase a PostgreSQL con integración Claude Code
- **Risk Assessment:** Análisis de riesgos y estrategias de mitigación

---

## 📄 Licencia

MIT License - Ver el archivo LICENSE para más detalles.

---

## 🔗 Enlaces Relacionados

- **Backend Repository:** [Sistema de Scraping Python](enlace-al-repo-backend)
- **Live Demo:** [https://dashboard-argentina.vercel.app](enlace-demo)
- **API Documentation:** [Próximamente]
- **Technical Specs:** `docs/prd.md`

---

*Dashboard Argentina es más que un comparador de precios: es una herramienta de análisis económico que ayuda a entender el panorama de precios argentino con perspectiva internacional y análisis granular por categorías.*

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>