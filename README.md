# MTNRS · Estudio 3D

Portfolio de Darío con una escena Three.js interactiva, selección de seis proyectos públicos, filtros y enlaces a demos y código.

## Ejecutar

Desde esta carpeta: `python -m http.server 8080` y abrir http://localhost:8080. No necesita compilación. GitHub Pages publica la raíz de `main`.

## Editar

- `index.html`: contenido y estructura.
- `assets/css/studio.css`: diseño responsive.
- `assets/js/studio.js`: catálogo y escena 3D.
- `assets/projects/`: capturas de las demos públicas.
- `assets/vendor/`: Three.js distribuido localmente, con su licencia MIT.

Arrastra la escena para girarla o selecciona sus piezas. Los seis botones proporcionan una alternativa accesible a la selección 3D. El giro automático es opcional; la escena deja de renderizar al quedar fuera de pantalla. Se respeta la preferencia de movimiento reducido y los proyectos siguen disponibles si WebGL falla. La selección incluye exclusivamente proyectos personales, herramientas y demos; no se incluyen entregas de clase. La paleta synthwave combina violeta oscuro, lavanda, rosa pastel y cian suave.

Los archivos anteriores se conservan por compatibilidad; la portada usa exclusivamente `studio.css` y `studio.js`.
