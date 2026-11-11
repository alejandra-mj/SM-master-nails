import { createRoot } from "react-dom/client";
import Catalogo from "./components/Catalogo.jsx";
import FormularioCita from "./components/FormularioCita.jsx";

/**
 * Punto de entrada del módulo React.
 * Se carga dentro de spa.html y reemplaza dos bloques de la página:
 *   - #react-catalogo: catálogo de servicios con buscador.
 *   - #react-cita: formulario "Solicitar una cita".
 * El resto de la página (menú, pie, modelos, colores) sigue siendo HTML.
 */
const catalogo = document.getElementById("react-catalogo");
if (catalogo) createRoot(catalogo).render(<Catalogo />);

const cita = document.getElementById("react-cita");
if (cita) createRoot(cita).render(<FormularioCita />);
