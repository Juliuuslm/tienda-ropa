# Tienda de Ropa - Migración a Astro

Sitio eCommerce moderno construido con **Astro 3.6.5 + React 18 + Tailwind CSS** migrado desde templates Envato (DESTRY y CASTRO).

## Características

- ✅ **SSG 100% estático**: Todas las páginas generadas en build time
- ✅ **React Islands**: Hidratación parcial solo donde se necesita
- ✅ **Mínimo JavaScript**: ~60 KB total (vs 300 KB original)
- ✅ **Imágenes optimizadas**: WebP/AVIF (60-70% reducción tamaño)
- ✅ **SEO completo**: Meta tags, OpenGraph, Structured Data
- ✅ **Accesible**: WCAG 2.1 AA
- ✅ **Rendimiento**: Lighthouse 90+

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| Astro | 3.6.5 | Framework SSG |
| React | 18.3.1 | UI interactivo (islands) |
| Tailwind CSS | 3.4.18 | Estilos utility-first |
| TypeScript | 5.9.3 | Type safety |
| pnpm | 10.19.0 | Package manager |

### Dependencias principales

- **swiper**: Sliders/carousels (Web Components, 15 KB)
- **photoswipe**: Lightbox de imágenes (8 KB)
- **react-hook-form**: Validación de formularios (9 KB)
- **@astrojs/react**: Integración de React
- **@astrojs/tailwind**: Integración de Tailwind
- **@astrojs/sitemap**: Generación automática de sitemap

**Dependencias eliminadas**: jQuery, Bootstrap JS, Owl Carousel, Isotope, LightGallery

## Estructura de Proyecto

```
site/
├── public/               # Assets estáticos
│   ├── fonts/           # Fuentes locales
│   ├── images/          # 120+ imágenes optimizadas
│   └── favicon.ico
├── src/
│   ├── assets/          # Assets procesados por Vite
│   ├── components/      # Componentes reutilizables
│   │   ├── common/      # Button, Image, Link, SEO
│   │   ├── layout/      # Header, Footer
│   │   ├── products/    # ProductCard, ProductGrid
│   │   └── cart/        # CartComponents
│   ├── context/         # React Context (Cart)
│   ├── data/            # JSON estáticos (products, etc)
│   ├── layouts/         # Layouts de página
│   │   └── BaseLayout.astro
│   ├── pages/           # Rutas automáticas
│   │   ├── index.astro  # Home
│   │   ├── shop.astro   # Listado de productos
│   │   ├── products/[slug].astro # Detalles de producto
│   │   ├── cart.astro
│   │   ├── checkout.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── blog.astro
│   ├── styles/          # CSS global + Tailwind
│   ├── utils/           # Funciones auxiliares
│   └── env.d.ts        # TypeScript declarations
├── scripts/
│   └── optimize-images.mjs # Script para optimizar imágenes
├── astro.config.mjs     # Config de Astro
├── tailwind.config.mjs   # Config de Tailwind
├── tsconfig.json        # TypeScript config
├── .eslintrc.json       # ESLint config
├── .prettierrc           # Prettier config
└── package.json
```

## Instalación y Desarrollo

### Requisitos previos

- Node.js 18+ (recomendado: Node.js 20)
- pnpm 10+ (instalar con `npm install -g pnpm`)

### Setup inicial

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Previsualizar build
pnpm preview

# Verificar tipos y lint
pnpm check
pnpm lint

# Formatear código
pnpm format
```

El sitio estará disponible en `http://localhost:4323`

## Páginas Generadas

### Core eCommerce
- `/` - Home con ofertas y testimonios
- `/shop` - Listado de productos (grid con filtros)
- `/products/[slug]` - Detalles de producto (30 páginas dinámicas)
- `/cart` - Carrito de compras
- `/checkout` - Checkout
- `/wishlist` - Lista de favoritos
- `/compare` - Comparación de productos

### Institucional
- `/about` - Sobre nosotros
- `/contact` - Contacto
- `/blog` - Blog de noticias

**Total: 39 páginas estáticas generadas automáticamente**

## Datos y Contenido

### Productos

Los productos se definen en `src/data/products.json`:

```json
{
  "id": "1",
  "slug": "vestido-elegante-negro",
  "name": "Vestido Elegante Negro",
  "price": 89.99,
  "salePrice": 69.99,
  "category": "vestidos",
  "image": "/images/products/medium-size/1.jpg",
  "images": [...],
  "description": "...",
  "stock": 15,
  "rating": 4.5,
  "reviews": 12,
  "colors": ["Negro", "Rojo"],
  "sizes": ["XS", "S", "M", "L", "XL"],
  "tags": ["elegante", "noche"]
}
```

### Cómo agregar nuevos productos

1. Editar `src/data/products.json` con nueva entrada
2. Compilar: `pnpm build`
3. Una nueva página `/products/[slug]` se generará automáticamente

## Componentes React (Islands)

### Contextos Disponibles

#### CartContext
Maneja el estado del carrito con localStorage:
- `addItem(item)` - Agregar al carrito
- `removeItem(id)` - Remover del carrito
- `updateQuantity(id, qty)` - Actualizar cantidad
- `clearCart()` - Vaciar carrito
- `items`, `total`, `count`

#### WishlistContext
Maneja la lista de favoritos con localStorage:
- `addItem(item)` - Agregar a favoritos
- `removeItem(id)` - Remover de favoritos
- `toggleItem(item)` - Agregar/remover
- `isInWishlist(id)` - Verificar si está en favoritos
- `clearWishlist()` - Limpiar favoritos
- `items`, `count`

#### CompareContext
Maneja la comparación de productos (máx 4):
- `addItem(item)` - Agregar a comparación
- `removeItem(id)` - Remover de comparación
- `toggleItem(item)` - Agregar/remover
- `isInCompare(id)` - Verificar si está en comparación
- `clearCompare()` - Limpiar comparación
- `items`, `count`

### Ejemplo de Uso

```tsx
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const MyComponent = () => {
  const { items, total, addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  return (
    <div>
      {/* Usar hooks aquí */}
    </div>
  );
};
```

### Hidratación selectiva

Los componentes React se hidratan solo cuando es necesario:

```astro
<!-- Hidrata solo cuando es visible -->
<ProductFilters client:visible />

<!-- Hidrata cuando el navegador está idle -->
<Newsletter client:idle />

<!-- Nunca hidrata (solo CSS/HTML) -->
<ProductCard />
```

## Optimización de Imágenes

### Conversión automática

Las imágenes se optimizan automáticamente con Sharp:

```bash
# Ejecutar optimización (realizado durante el setup)
pnpm node scripts/optimize-images.mjs
```

Genera:
- WebP 80% calidad (~60% reducción tamaño)
- AVIF 85% calidad
- Fallback JPG/PNG original

### Uso en componentes

```astro
<Image
  src="/images/products/1.jpg"
  alt="Producto"
  lazy={true}
  class="w-full rounded"
/>
```

El componente automáticamente sirve `.avif`, `.webp` y fallback.

## Estilos y Tailwind

### Variables de color

Personalizar en `tailwind.config.mjs`:

```js
colors: {
  primary: {
    50: '#f8f4f0',
    600: '#b48c64',
    700: '#8c663a',
  },
  // ...
}
```

### Actualizar estilos globales

En `src/styles/global.css` puedes añadir estilos base que se aplican a todo el sitio.

## SEO y Metadatos

### Componente SEO

Usar en cualquier página:

```astro
---
import SEO from '@/components/common/SEO.astro';
---

<SEO
  title="Mi Página"
  description="Descripción de la página"
  image="/images/og-image.jpg"
  type="article"
/>
```

### Estructura de datos

Automáticamente incluye:
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- JSON-LD (Schema.org)
- Sitemap.xml

## Build y Deploy

### Vercel (recomendado)

1. Conectar repo en Vercel
2. Build command: `pnpm build`
3. Output directory: `dist`
4. Deploy automático en cada push a `main`

### Netlify

Similar a Vercel, con soporte para Forms integrado.

### Cloudflare Pages

Bandwidth ilimitado:
1. Conectar repo
2. Framework: Astro
3. Deploy automático

## CI/CD Pipeline

GitHub Actions en `.github/workflows/deploy.yml`:

```yaml
lint → type-check → build → deploy
```

Ejecuta en cada push a main.

## Accesibilidad

Checklist WCAG 2.1 AA:
- ✅ Semantic HTML5
- ✅ Alt text en imágenes
- ✅ Contrast ratio 4.5:1
- ✅ Navegación por teclado
- ✅ Focus visible
- ✅ ARIA labels
- ✅ Screen reader friendly

## Performance

### Métricas objetivo

| Métrica | Target |
|---------|--------|
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |
| Lighthouse Performance | 90+ |

### Optimizaciones aplicadas

- Imágenes en WebP/AVIF
- Lazy loading
- Code splitting de React
- Minificación automática
- CSS crítico inline
- Eliminación de CSS no usado

## Troubleshooting

### El build es lento

- Borrar `.astro/` y `dist/`
- Ejecutar `pnpm install` nuevamente
- Usar `pnpm install --frozen-lockfile` para reproducibilidad

### Las imágenes no cargan

- Verificar que existan en `public/images/`
- Ejecutar `pnpm node scripts/optimize-images.mjs`
- Revisar rutas en `src/data/products.json`

### React component no renderiza

- Asegurar que tenga `client:visible` o similar
- Verificar que no haya errores en la consola
- Revisar que CartProvider esté wrapping el componente

## Roadmap

### Completado ✅
- [x] Setup e infraestructura Astro
- [x] Layouts y componentes base
- [x] Home page con ofertas
- [x] Productos (30 items dinámicos)
- [x] Carrito de compras (localStorage)
- [x] Wishlist/Favoritos
- [x] Comparación de productos
- [x] Blog de noticias
- [x] Páginas institucionales (About, Contact)
- [x] Componentes especiales (Newsletter, Testimonials, Filters)
- [x] SEO completo (JSON-LD, OG tags)
- [x] Accesibilidad WCAG 2.1 AA
- [x] Performance optimization (Lighthouse 90+)
- [x] CI/CD con GitHub Actions

### Pendiente 🚀
- [ ] Integración real de carrito con backend
- [ ] Autenticación de usuarios
- [ ] Sistema de comentarios en blog
- [ ] Búsqueda full-text de productos
- [ ] Filtros avanzados más interactivos
- [ ] Integración de pasarela de pago (Stripe/PayPal)
- [ ] Dashboard de admin
- [ ] Notificaciones de stock bajo
- [ ] Reviews y ratings de usuarios
- [ ] Sistema de cupones/descuentos

## Documentación

- **[README.md](./README.md)** - Este archivo
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guía de contribución
- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Estándares de accesibilidad
- **[PERFORMANCE.md](./PERFORMANCE.md)** - Optimización y métricas

## Licencia

Este proyecto fue migrado desde templates Envato (DESTRY y CASTRO).
Asegúrate de respetar las licencias de los templates y assets originales.

## Contacto y Soporte

Para preguntas sobre la migración o mejoras:
- Email: info@tiendaderopa.com
- GitHub Issues: [Crear issue](https://github.com/your-repo/issues)

---

**Última actualización**: Noviembre 2024
**Versión**: 1.0.0 - MVP Completado
**Páginas Generadas**: 39
**Build Time**: ~2s
**Lighthouse**: 90+

