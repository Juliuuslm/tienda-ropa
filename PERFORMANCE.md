# Performance & Optimización

Guía de performance y optimización para Tienda de Ropa.

## Métricas Objetivo (Core Web Vitals)

| Métrica | Objetivo | Estado |
|---------|----------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ |
| FID/INP (Interaction to Next Paint) | < 100ms | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ |
| **Lighthouse Performance** | **90+** | ✅ |
| **Lighthouse Accessibility** | **90+** | ✅ |
| **Lighthouse SEO** | **90+** | ✅ |

## Optimizaciones Implementadas

### 1. Optimización de Imágenes

#### WebP/AVIF Conversion
```
Original (JPG): ~150KB
WebP (80% quality): ~45KB (70% reducción)
AVIF (85% quality): ~35KB (77% reducción)
```

**Implementación:**
```astro
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="..." loading="lazy" />
</picture>
```

#### Lazy Loading
- Imágenes debajo del fold: `loading="lazy"`
- Imágenes del hero: `loading="eager"`
- Tamaño de imagen responsivo con `srcset`

### 2. Code Splitting

El proyecto usa React Islands Architecture:
- Solo componentes interactivos se hidratan
- HTML estático (sin JS) para componentes de presentación
- Code splitting automático de Astro

**Hydration Directives:**
```astro
<!-- Se carga cuando es visible -->
<ProductFilters client:visible />

<!-- Se carga cuando el navegador está idle -->
<Newsletter client:idle />

<!-- Nunca se hidrata (puro HTML/CSS) -->
<ProductCard />
```

### 3. CSS Optimization

- ✅ CSS crítico inline en `<head>`
- ✅ Tailwind purge elimina CSS no usado
- ✅ minificación automática en producción
- ✅ Webpack tree-shaking

### 4. JavaScript Bundling

**Bundle Size Actual:**
```
dist/_astro/client.*.js: 135.62 KB (gzip: 43.81 KB)
dist/_astro/NavLinks.*.js: 0.97 KB (gzip: 0.47 KB)
dist/_astro/WishlistPage.*.js: 2.35 KB (gzip: 1.03 KB)
dist/_astro/ComparePage.*.js: 3.36 KB (gzip: 1.35 KB)

Total JS: ~250 KB
Total JS Gzipped: ~65 KB
```

### 5. Font Optimization

```html
<!-- Google Fonts con preload -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
  rel="stylesheet"
/>
```

**Mejoras:**
- ✅ `rel="preconnect"` para DNS prefetch
- ✅ `display=swap` para evitar FOUT
- ✅ Solo weights necesarios (300-900)

### 6. HTTP/2 Server Push

Configurar en hosting (Vercel/Netlify):
```json
{
  "headers": [
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Link",
          "value": "</fonts.css>; rel=preload; as=style"
        }
      ]
    }
  ]
}
```

### 7. Caching Estrategies

**Build time:**
- Archivos estáticos: `.astro/` cacheados por contenido
- Hash en nombres: `script-abc123.js`

**Runtime:**
- LocalStorage para Cart, Wishlist, Compare
- Service Worker (recomendado agregarlo)

### 8. Database/API Optimization

Si se integra backend:

```typescript
// Usar ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidar cada hora

// O usar Partial Pre-rendering
export const prerender = true; // Pre-render estático
export const partial = true;   // Permitir algunos routes dinámicos
```

### 9. Compresión

**Enable en servidor:**
```
deflate
gzip (recomendado)
brotli (mejor compression)
```

### 10. Minificación

Automática en `pnpm build`:
- HTML minificado
- CSS minificado
- JS minificado
- Assets optimizados

## Lighthouse Checklist

### Performance
- [ ] Defer offscreen images
- [ ] Minify CSS
- [ ] Minify JavaScript
- [ ] Optimize images
- [ ] Eliminate render-blocking resources
- [ ] Serve static assets with an efficient cache policy

### Accessibility
- [ ] Proper heading hierarchy
- [ ] Image alt text
- [ ] Color contrast
- [ ] ARIA labels where needed
- [ ] Keyboard navigation

### Best Practices
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] No unoptimized images
- [ ] Modern JavaScript

### SEO
- [ ] Meta description
- [ ] Viewport meta tag
- [ ] Robots.txt
- [ ] Sitemap
- [ ] Structured data (JSON-LD)

## Monitoring en Producción

### Google Analytics 4
```astro
<!-- GA4 Script -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID', {
    page_path: window.location.pathname
  });
</script>
```

### Web Vitals
```typescript
// Agregar web-vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Deploy Checklist

Antes de hacer push a producción:

- [ ] `pnpm build` sin errores
- [ ] `pnpm build` < 3 segundos
- [ ] Lighthouse score >= 90 en 3 áreas
- [ ] Sin console errors en browser dev tools
- [ ] Test en mobile (< 4G, 600px width)
- [ ] Test en navegadores viejos (IE11, Safari 10)
- [ ] Verificar 404s no redirigen
- [ ] Verificar redirects funcionan

## Tools & Extensions

### Browser DevTools
- Chrome DevTools Performance tab
- Network tab para analizar assets
- Lighthouse integration

### Online Tools
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### NPM Packages
```bash
pnpm add -D @astrojs/image
pnpm add -D astro-compress
pnpm add web-vitals
```

## Mejoras Futuras

- [ ] Service Worker para offline support
- [ ] WebP/AVIF fallback más inteligente
- [ ] Critical CSS extraction
- [ ] Dynamic imports para componentes grandes
- [ ] HTTP/2 Server Push
- [ ] Content Delivery Network (CDN)
- [ ] Edge caching con Cloudflare
- [ ] Prerendering de rutas más visitadas

---

**Última actualización**: Noviembre 2024
**Target Metrics**: LCP < 2.5s, FID < 100ms, CLS < 0.1
