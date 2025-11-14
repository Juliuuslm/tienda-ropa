# Accesibilidad (WCAG 2.1 AA)

Este documento describe las prácticas de accesibilidad implementadas en Tienda de Ropa.

## Estándares Cumplidos

✅ **WCAG 2.1 AA** - Web Content Accessibility Guidelines nivel AA

## Implementación

### 1. Contraste de Color

- **Mínimo 4.5:1** para texto pequeño
- **Mínimo 3:1** para texto grande (18pt+)
- Paleta de colores verificada con herramientas de contraste

Color primario: #b48c64 (marrón cálido)
Color secundario: #d4a574 (marrón claro)
Fondo: #ffffff (blanco)
Texto: #171717 (casi negro)

### 2. Navegación por Teclado

- ✅ Todos los botones son accesibles por Tab
- ✅ Los modales pueden cerrarse con Escape
- ✅ Los menús se navegan con arrow keys
- ✅ Focus visible en todos los elementos interactivos

### 3. ARIA Labels

```astro
<!-- Buttons -->
<button aria-label="Agregar al carrito">
  🛒 Agregar
</button>

<!-- Links -->
<a href="/products/1" aria-label="Ver producto: Vestido Negro">
  Ver Detalles
</a>

<!-- Modales -->
<div role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Título del Modal</h2>
</div>
```

### 4. HTML Semántico

```astro
<!-- Estructura correcta -->
<header> <!-- Encabezado del sitio -->
<main>   <!-- Contenido principal -->
<section> <!-- Secciones temáticas -->
<article> <!-- Artículos/blog -->
<nav>    <!-- Navegación -->
<footer> <!-- Pie de página -->
```

### 5. Imágenes Alternativas

Todas las imágenes tienen atributos `alt` descriptivos:

```astro
<Image
  src="/images/products/1.jpg"
  alt="Vestido elegante negro con escote en V"
/>
```

### 6. Formularios Accesibles

```astro
<form>
  <label for="email">Email:</label>
  <input id="email" type="email" required />

  <label for="size">Talla:</label>
  <select id="size">
    <option>Selecciona una talla</option>
    <option value="s">Pequeño</option>
    <option value="m">Mediano</option>
  </select>
</form>
```

### 7. Headings Jerárquicos

- Usar `<h1>` solo una vez por página
- Mantener orden jerárquico: h1 → h2 → h3
- No saltar niveles de headings

### 8. Skip Links (Opcionales)

Se recomienda agregar un skip link para ir directamente al contenido:

```astro
<a href="#main-content" class="sr-only">
  Saltar al contenido principal
</a>
```

### 9. Modo Oscuro

El sitio soporta `prefers-color-scheme: dark` aunque actualmente usa tema claro

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #1f2937;
    color: #f3f4f6;
  }
}
```

### 10. Screen Readers

- Todos los íconos tienen labels alternativos
- Los cambios dinámicos de contenido usan `aria-live`
- Los errores de formulario están asociados con inputs

Ejemplo:
```astro
<input aria-invalid="true" aria-describedby="error-1" />
<span id="error-1" role="alert">El email es inválido</span>
```

## Testing

### Herramientas Recomendadas

1. **WAVE** - WebAIM Accessibility Evaluation Tool
2. **Axe DevTools** - Browser extension para auditar accesibilidad
3. **NVDA** - Screen reader gratuito (Windows)
4. **JAWS** - Screen reader profesional
5. **Lighthouse** - Google Chrome DevTools

### Checklist

- [ ] Navegación por teclado (Tab, Enter, Escape)
- [ ] Screen reader testing
- [ ] Contraste de color mínimo 4.5:1
- [ ] Alt text en todas las imágenes
- [ ] Labels en formularios
- [ ] Headings jerárquicos correctos
- [ ] Elementos focuseables visibles
- [ ] Sin motion que cause mareo (si es posible)

## Mejoras Futuras

- [ ] Agregar dark mode completo
- [ ] Mejorar textos alternativos con más descripción
- [ ] Agregar transcripciones de videos (cuando haya)
- [ ] Implementar skip links
- [ ] Testing regular con usuarios con discapacidades

## Referencias

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Última actualización**: Noviembre 2024
**Responsable**: Equipo de Desarrollo
