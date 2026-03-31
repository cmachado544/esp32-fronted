
## ESP32-CAM Image Gallery - Plan de Implementación

### 1. Landing Page (Página de inicio)
- Fondo con degradado elegante (azul institucional)
- Logo/sello UNACH centrado (placeholder por ahora)
- Título "Sistema de Captura ESP32-CAM" y subtítulo con nombre de la universidad
- Botón "Ir a Galería" con animación fade-in/scale
- Diseño limpio y profesional

### 2. Galería de imágenes
- **Grid responsivo**: 1 col (móvil) → 2-3 (tablet) → 4 (desktop)
- Tarjetas con bordes redondeados, sombra suave, efecto hover zoom
- Loader/skeleton mientras cargan
- Imágenes mock de ejemplo (usando placeholder URLs)

### 3. Lightbox completo
- Overlay oscuro al hacer clic en imagen
- Navegación anterior/siguiente con flechas
- Zoom con botones +/-
- Botón cerrar (X)
- Soporte teclado (flechas, Escape)
- Gestos táctiles para móvil (swipe)

### 4. Selección múltiple
- Checkbox en cada tarjeta (visible en hover o modo selección)
- Contador de imágenes seleccionadas en toolbar superior
- Botón "Seleccionar todo" / "Deseleccionar todo"
- Barra de acciones sticky cuando hay selección activa

### 5. Acciones
- **Eliminar**: Botón con diálogo de confirmación, elimina de datos mock, toast de éxito
- **Descargar**: Descarga individual desde lightbox, descarga múltiple (ZIP) con jszip para selección
- Toast notifications para todas las acciones (éxito/error)

### 6. Arquitectura del código
- Servicios mock (`src/services/imageService.ts`) con interfaz lista para reemplazar con API real
- Hooks personalizados: `useImages`, `useImageSelection`, `useLightbox`
- Componentes modulares: `ImageCard`, `ImageGrid`, `Lightbox`, `SelectionToolbar`, `GalleryHeader`
- Tipos TypeScript bien definidos para Image, API responses
- Comentarios indicando dónde conectar el backend real

### 7. Navegación
- React Router: `/` (landing) y `/gallery` (galería)
- Header simple en galería con botón volver

### Dependencia adicional: `jszip` para descarga múltiple en ZIP
