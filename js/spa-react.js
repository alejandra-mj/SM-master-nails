// Componente React de la página Spa: "Mis citas solicitadas".
// Muestra una lista con las citas que se envían en el formulario de arriba.
// React se carga desde internet en spa.html (react y react-dom).

// h es una forma corta de crear elementos HTML con React
const h = React.createElement;

// Nombre con el que se guardan las citas en el navegador
const CLAVE = "citasSolicitadas";

// Lee las citas guardadas. Si no hay nada guardado, devuelve una lista vacía
function leerCitas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE));
    return Array.isArray(guardadas) ? guardadas : [];
  } catch (error) {
    return [];
  }
}

// Guarda la lista de citas en el navegador
function guardarCitas(citas) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(citas));
  } catch (error) {
    // Si el navegador no deja guardar, la lista sigue funcionando sin guardarse
  }
}

// Componente ItemCita: una fila de la lista con el servicio, el nombre y la fecha
function ItemCita(props) {
  const cita = props.cita;

  return h(
    "li",
    { className: "list-group-item d-flex justify-content-between align-items-center gap-3" },
    h(
      "div",
      null,
      h("strong", null, cita.servicio),
      h("div", { className: "small" }, cita.nombre + " · " + cita.fecha)
    ),
    // Botón para quitar esta cita
    h(
      "button",
      {
        type: "button",
        className: "btn btn-sm btn-outline-danger",
        "aria-label": "Quitar la cita de " + cita.nombre,
        onClick: () => props.alEliminar(cita.id),
      },
      h("i", { className: "bi bi-trash" })
    )
  );
}

// Componente MisCitas: el panel completo
function MisCitas() {
  // citas guarda la lista que se muestra; setCitas la cambia
  const [citas, setCitas] = React.useState(leerCitas);

  // Se ejecuta una sola vez: queda atento al envío del formulario de cita
  React.useEffect(() => {
    function alEnviar(evento) {
      const formulario = evento.target;

      // Solo nos interesa el formulario de cita de esta página
      if (formulario.id !== "formularioCita") return;

      // Si el formulario tiene errores, no se guarda nada
      if (!formulario.checkValidity()) return;

      // Se arma la cita con los datos escritos en el formulario
      const nueva = {
        id: Date.now(),
        nombre: formulario.querySelector("#nombreCita").value.trim(),
        servicio: formulario.querySelector("#servicioCita").value,
        fecha: formulario.querySelector("#fechaCita").value,
      };

      // La nueva cita va de primera en la lista
      setCitas((anteriores) => [nueva, ...anteriores]);
    }

    // El "true" hace que se lea el formulario antes de que script.js lo limpie
    document.addEventListener("submit", alEnviar, true);
    return () => document.removeEventListener("submit", alEnviar, true);
  }, []);

  // Cada vez que cambia la lista, se guarda en el navegador
  React.useEffect(() => {
    guardarCitas(citas);
  }, [citas]);

  // Quita una cita de la lista por su id
  function eliminar(id) {
    setCitas((anteriores) => anteriores.filter((c) => c.id !== id));
  }

  // Si no hay citas se muestra un aviso; si hay, la lista y el botón de vaciar
  let contenido;
  if (citas.length === 0) {
    contenido = h("p", { className: "mb-0" }, "Aún no has solicitado citas. Usa el formulario de arriba.");
  } else {
    contenido = [
      h(
        "ul",
        { className: "list-group mb-3", key: "lista" },
        citas.map((c) => h(ItemCita, { key: c.id, cita: c, alEliminar: eliminar }))
      ),
      h(
        "button",
        { type: "button", className: "btn btn-sm-morado", key: "vaciar", onClick: () => setCitas([]) },
        "Vaciar lista"
      ),
    ];
  }

  return h(
    "div",
    { className: "row justify-content-center" },
    h(
      "div",
      { className: "col-lg-7" },
      h("div", { className: "form-panel" }, h("h2", { className: "titulo-seccion mb-3" }, "Mis citas solicitadas"), contenido)
    )
  );
}

// Se dibuja el componente dentro del espacio vacío que hay en spa.html
const espacio = document.getElementById("react-citas");
if (espacio) {
  ReactDOM.createRoot(espacio).render(h(MisCitas));
}