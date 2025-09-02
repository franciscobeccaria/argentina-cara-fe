# Claude Code - Dashboard Argentina Database Management

Este archivo contiene información específica para que Claude Code pueda gestionar eficientemente la base de datos del Dashboard Argentina.

## 🗄️ Información de Base de Datos

### Configuración Local
- **Database**: PostgreSQL 16.9
- **Database Name**: `dashboard_argentina`
- **User**: `dashboard_user`
- **Password**: `dashboard_password`
- **Host**: `localhost`
- **Port**: `5432`

### Conexión Directa
```bash
# Conectar a la base de datos
PGPASSWORD=dashboard_password psql -h localhost -U dashboard_user -d dashboard_argentina

# Listar tablas
PGPASSWORD=dashboard_password psql -h localhost -U dashboard_user -d dashboard_argentina -c "\dt"
```

### Connection String
```
postgresql://dashboard_user:dashboard_password@localhost:5432/dashboard_argentina
```

## 🏗️ Arquitectura de Base de Datos

### Tablas Principales

#### `productos_ultimos_precios` (productos)
- **Propósito**: Almacena todos los productos con sus precios
- **Campos clave**: `product_id`, `product_name`, `brand`, `image_url`, `category_id`, `data` (JSONB)
- **Estructura JSONB**: `{"AR": {"value": number, "currency": "ARS"}, "US": {"value": number, "currency": "USD"}}`

#### `categories` (categorías)
- **Propósito**: Organización de productos por categorías
- **Categorías predefinidas**: tech, fashion, food, home, cars, other
- **Campos**: `name`, `display_name`, `description`, `color`, `icon`

#### `user_contributions` (contribuciones futuras)
- **Propósito**: Sistema de contribuciones de usuarios
- **Estado**: Preparado para Story 1.2+

#### `votes` (votaciones futuras)
- **Propósito**: Sistema de votación para control de calidad
- **Estado**: Preparado para Story 1.3+

#### `price_history` (historial de precios)
- **Propósito**: Seguimiento histórico de cambios de precios
- **Campos**: `product_id`, `prices` (JSONB), `source`, `created_at`

## 🛠️ Scripts Útiles para Claude Code

### Ver todos los productos
```sql
SELECT 
  product_id,
  product_name,
  brand,
  category_id,
  data->'AR'->>'value' as precio_argentina,
  data->'AR'->>'currency' as moneda_argentina,
  data->'US'->>'value' as precio_usa,
  updated_at
FROM productos_ultimos_precios 
ORDER BY updated_at DESC;
```

### Ver productos por categoría
```sql
SELECT 
  p.product_name,
  c.display_name as categoria,
  p.data->'AR'->>'value' as precio_ar,
  p.data->'US'->>'value' as precio_us
FROM productos_ultimos_precios p
JOIN categories c ON p.category_id = c.id
WHERE c.name = 'tech'
ORDER BY p.updated_at DESC;
```

### Calcular índice económico
```sql
WITH price_comparison AS (
  SELECT 
    product_name,
    (data->'AR'->>'value')::numeric / 1250.0 as precio_ar_usd,
    (data->'US'->>'value')::numeric as precio_us_usd,
    CASE 
      WHEN (data->'AR'->>'value')::numeric / 1250.0 > (data->'US'->>'value')::numeric 
      THEN ((data->'AR'->>'value')::numeric / 1250.0 - (data->'US'->>'value')::numeric) / (data->'US'->>'value')::numeric * 100
      ELSE ((data->'AR'->>'value')::numeric / 1250.0 - (data->'US'->>'value')::numeric) / (data->'US'->>'value')::numeric * 100
    END as diferencia_porcentual
  FROM productos_ultimos_precios
)
SELECT 
  AVG(diferencia_porcentual) as indice_general,
  COUNT(*) as total_productos
FROM price_comparison;
```

### Insertar nuevo producto
```sql
INSERT INTO productos_ultimos_precios (
  product_id, 
  product_name, 
  brand, 
  image_url, 
  category_id,
  data
) VALUES (
  'ejemplo-producto',
  'Producto de Ejemplo',
  'Marca Ejemplo',
  'https://example.com/imagen.jpg',
  (SELECT id FROM categories WHERE name = 'other'),
  '{"AR": {"value": 50000, "currency": "ARS"}, "US": {"value": 40, "currency": "USD"}}'::jsonb
);
```

## 📊 NPM Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Iniciar servidor de desarrollo
npm run build            # Construir para producción

# Base de datos
npm run db:seed          # Poblar con datos de ejemplo
npm run db:migrate       # Migrar desde Supabase (requiere credenciales)
npm run db:reset         # Resetear base de datos
npm run db:studio        # Abrir Prisma Studio

# Prisma
npx prisma generate      # Generar cliente Prisma
npx prisma migrate dev   # Crear nueva migración
npx prisma studio        # Interface visual de base de datos
```

## 🚀 Comandos de Gestión Rápida

### Backup de base de datos
```bash
pg_dump -h localhost -U dashboard_user -d dashboard_argentina > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restaurar backup
```bash
PGPASSWORD=dashboard_password psql -h localhost -U dashboard_user -d dashboard_argentina < backup_file.sql
```

### Ver logs de PostgreSQL
```bash
sudo tail -f /var/log/postgresql/postgresql-16-main.log
```

### Resetear datos y repoblar
```bash
npm run db:reset
npm run db:seed
```

## 🧪 Testing de Base de Datos

### Verificar conexión
```bash
PGPASSWORD=dashboard_password psql -h localhost -U dashboard_user -d dashboard_argentina -c "SELECT version();"
```

### Ver estadísticas rápidas
```sql
-- Contar productos por categoría
SELECT 
  c.display_name,
  COUNT(p.*) as total_productos
FROM categories c
LEFT JOIN productos_ultimos_precios p ON c.id = p.category_id
GROUP BY c.id, c.display_name
ORDER BY total_productos DESC;

-- Ver últimas actualizaciones
SELECT 
  product_name,
  updated_at,
  data->'AR'->>'value' as precio_ar
FROM productos_ultimos_precios 
ORDER BY updated_at DESC 
LIMIT 5;
```

## 📝 Notas para Desarrollo

### Estado Actual (Story 1.1 Completada)
- ✅ PostgreSQL configurado y funcionando
- ✅ Prisma ORM integrado
- ✅ Migración de datos completada
- ✅ API refactorizada para usar Prisma
- ✅ Aplicación funcionando correctamente
- ✅ Esquema preparado para futuras user stories

### Próximos Pasos (Story 1.2+)
1. **User Contributions**: Implementar formularios para contribuciones de usuarios
2. **Voting System**: Sistema de votación con fingerprinting
3. **Admin Panel**: Panel de verificación y moderación
4. **Category Indices**: Índices dinámicos por categoría
5. **Historical Tracking**: Seguimiento de tendencias temporales

## 🔧 Troubleshooting

### Problemas Comunes
1. **Error de conexión**: Verificar que PostgreSQL esté ejecutándose
2. **Permisos**: Asegurar que `dashboard_user` tenga permisos adecuados  
3. **Puerto ocupado**: PostgreSQL usa puerto 5432 por defecto
4. **Prisma Client**: Ejecutar `npx prisma generate` después de cambios en schema

### Comandos de Diagnóstico
```bash
# Verificar estado de PostgreSQL
sudo systemctl status postgresql

# Ver conexiones activas
PGPASSWORD=dashboard_password psql -h localhost -U dashboard_user -d dashboard_argentina -c "SELECT * FROM pg_stat_activity WHERE datname = 'dashboard_argentina';"

# Ver tamaño de base de datos
PGPASSWORD=dashboard_password psql -h localhost -U dashboard_user -d dashboard_argentina -c "SELECT pg_size_pretty(pg_database_size('dashboard_argentina'));"
```

---

**🤖 Este archivo fue generado por Claude Code para facilitar la gestión eficiente de la base de datos Dashboard Argentina.**