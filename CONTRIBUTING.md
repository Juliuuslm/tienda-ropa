# Guía de Contribución

Gracias por tu interés en contribuir a **Tienda de Ropa**. Esta guía te ayudará a entender cómo funcionan las cosas y cómo contribuir.

## Desarrollo Local

### Requisitos Previos

- Node.js 18+ (recomendado: 20.x)
- pnpm 10+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tienda-de-ropa.git
cd tienda-de-ropa/site

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:4323`

### Estructura del Proyecto

```
site/
├── .github/               # GitHub Actions y configuración
├── public/               # Assets estáticos
│   ├── fonts/           # Fuentes locales
│   ├── images/          # Imágenes optimizadas
│   └── favicon.ico
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── common/      # Componentes genéricos (Button, Image, etc)
│   │   ├── layout/      # Header, Footer, Navigation
│   │   ├── products/    # ProductCard, ProductGrid, Filters, etc
│   │   ├── cart/        # Componentes del carrito
│   │   ├── wishlist/    # Componentes de favoritos
│   │   ├── compare/     # Componentes de comparación
│   │   └── common/      # Newsletter, Testimonials, etc
│   ├── context/         # React Context (Cart, Wishlist, Compare)
│   ├── data/            # JSON estáticos (products)
│   ├── layouts/         # Layouts de página (BaseLayout)
│   ├── pages/           # Rutas automáticas (basadas en archivos)
│   ├── styles/          # CSS global + Tailwind
│   └── utils/           # Funciones auxiliares
├── scripts/             # Scripts de build (optimización de imágenes)
├── astro.config.mjs     # Configuración de Astro
├── tailwind.config.mjs   # Configuración de Tailwind
├── package.json         # Dependencias
├── tsconfig.json        # Configuración de TypeScript
└── README.md            # Documentación principal
```

## Flujo de Git

### Crear una Rama

```bash
# Actualizar main
git checkout main
git pull origin main

# Crear rama feature
git checkout -b feature/nombre-de-la-caracteristica

# O rama bugfix
git checkout -b bugfix/nombre-del-bug
```

### Commit Messages

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Agregar componente Newsletter
fix: Corregir error en ProductCard
refactor: Simplificar lógica de filtros
docs: Actualizar README
test: Agregar tests para CartContext
perf: Optimizar imágenes de productos
chore: Actualizar dependencias
```

Commits siempre en español (por request del proyecto):

```bash
git commit -m "feat: Agregar funcionalidad de búsqueda de productos"
```

### Enviar Cambios

```bash
# Adicionar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: Tu descripción aquí"

# Push a tu rama
git push origin feature/tu-rama
```

## Pull Request

Crea un PR descriptivo con:

1. **Título**: Breve resumen (feat: ..., fix: ..., etc)
2. **Descripción**:
   - Qué cambió y por qué
   - Links a issues relacionados
   - Screenshots si aplica (UI changes)
3. **Checklist**:
   - [ ] Código testeado localmente
   - [ ] Sin console errors
   - [ ] Build exitoso (`pnpm build`)
   - [ ] Lint pasa (`pnpm lint`)
   - [ ] TypeScript sin errores (`pnpm check`)

## Estándares de Código

### TypeScript

- Usar `interface` para tipos públicos
- Usar `type` para tipos internos
- Siempre tipar props de componentes React

```typescript
export interface Props {
  id: string;
  title: string;
  price: number;
  onAdd?: (id: string) => void;
}

const MyComponent: React.FC<Props> = ({ id, title, price, onAdd }) => {
  // ...
};
```

### Componentes Astro

```astro
---
export interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

const { title, variant = 'primary' } = Astro.props;
---

<div class="...">
  <h1>{title}</h1>
</div>
```

### React Components

Usar `client:visible` para componentes interactivos:

```astro
<ProductFilters client:visible />
```

### Naming Conventions

- **Archivos**: `PascalCase` para componentes, `camelCase` para utils/hooks
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **CSS Classes**: Usar Tailwind utilities

### Comentarios

```typescript
// ✅ Bien - comenta el porqué, no el qué
// Limitar a 4 productos para mejor experiencia comparativa
const MAX_COMPARE_ITEMS = 4;

// ❌ Evitar - comentarios obvios
// Incrementar el contador
count++;
```

## Testing

### Ejecutar Tests

```bash
# Tests unitarios
pnpm test

# Tests con coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Estructura de Tests

```typescript
import { describe, it, expect } from 'vitest';

describe('ProductCard', () => {
  it('should render product name', () => {
    // Arrange
    const product = { id: '1', name: 'Vestido' };

    // Act
    const { getByText } = render(<ProductCard {...product} />);

    // Assert
    expect(getByText('Vestido')).toBeInTheDocument();
  });
});
```

## Performance

Antes de hacer commit:

```bash
# Verificar tamaño de bundle
pnpm build

# Correr Lighthouse localmente
npm install -g @lhci/cli@latest
lhci autorun

# Verificar bundle size
pnpm analyze
```

## Documentación

- Documentar funciones complejas
- Actualizar README si cambia algo importante
- Agregar comentarios en archivos de configuración

## Errores Comunes

### Error: "useWishlist must be used within WishlistProvider"

**Causa**: El componente está siendo renderizado en el servidor durante build.

**Solución**: Asegurar que está dentro del AppProviders o usar `client:visible`:

```astro
<!-- ❌ Incorrecto -->
<WishlistPage />

<!-- ✅ Correcto -->
<WishlistPage client:visible />
```

### Error: Import de image no existe

**Causa**: Ruta incorrecta a la imagen en `public/images/`

**Solución**: Usar rutas relativas correctas:

```astro
<!-- ✅ Correcto -->
<Image src="/images/products/1.jpg" alt="..." />

<!-- ❌ Incorrecto -->
<Image src="./images/products/1.jpg" alt="..." />
```

### Build lento (> 5s)

**Causa**: Cache corrupto de Astro

**Solución**:
```bash
rm -rf .astro dist
pnpm build
```

## Hacer Deploy

El proyecto usa GitHub Actions para deploy automático.

**En `main`**: Deploy a producción (Vercel)
**En `staging`**: Deploy a preview (Vercel)

Solo necesitas hacer push - el workflow se ejecuta automáticamente.

### Requisitos para Deploy

- [ ] Tests pasando
- [ ] Lint sin errores
- [ ] TypeScript sin errores
- [ ] Build exitoso
- [ ] Lighthouse score >= 85

## Preguntas?

- Abre una issue en GitHub
- Revisa la documentación en `/docs`
- Contacta al equipo

---

**Gracias por contribuir! 🙏**
