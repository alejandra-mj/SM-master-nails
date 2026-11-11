# SM MasterNails - Módulo React dentro de spa.html

Código fuente de los componentes React que se muestran dentro de la página Spa:
catálogo de servicios con buscador y formulario "Solicitar una cita".

## Componentes
- Catalogo: título, buscador y lista de servicios.
- TarjetaServicio: tarjeta de cada servicio.
- FormularioCita: formulario con validaciones.
- Mensaje: ventana de éxito o error.

## Cómo se usa
spa.html tiene dos espacios (`react-catalogo` y `react-cita`) y carga `js/spa-react.js`,
que es el resultado de compilar esta carpeta.

Para volver a compilar después de cambiar el código:

    cd react
    npm install
    npm run build
