import { useState } from "react";
import servicios from "../datos/servicios.js";
import Mensaje from "./Mensaje.jsx";

// Valores iniciales del formulario
const vacio = { nombre: "", telefono: "", servicio: "", fecha: "" };

/**
 * Devuelve la fecha de hoy en formato aaaa-mm-dd.
 * @returns {string}
 */
function fechaHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

/**
 * Valida los datos de la cita.
 * @param {{nombre: string, telefono: string, servicio: string, fecha: string}} datos
 * @returns {Object} Un mensaje de error por cada campo incorrecto.
 */
function validar(datos) {
  const errores = {};
  if (datos.nombre.trim().length < 3) {
    errores.nombre = "Escribe tu nombre completo (mínimo 3 letras).";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(datos.nombre.trim())) {
    errores.nombre = "El nombre solo puede tener letras.";
  }
  if (!/^[0-9]{7,15}$/.test(datos.telefono)) {
    errores.telefono = "Ingresa entre 7 y 15 dígitos, solo números.";
  }
  if (datos.servicio === "") {
    errores.servicio = "Selecciona un servicio.";
  }
  if (datos.fecha === "") {
    errores.fecha = "Elige una fecha.";
  } else if (datos.fecha < fechaHoy()) {
    errores.fecha = "Elige una fecha de hoy o posterior.";
  }
  return errores;
}

/**
 * Formulario "Solicitar una cita" del spa.
 * Reemplaza dentro de spa.html el formulario hecho en HTML.
 */
export default function FormularioCita() {
  const [datos, setDatos] = useState(vacio);
  const [errores, setErrores] = useState({});
  const [intentado, setIntentado] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // Actualiza el campo que la persona está escribiendo
  function cambiar(evento) {
    const { name, value } = evento.target;
    const nuevos = { ...datos, [name]: value };
    setDatos(nuevos);
    if (intentado) setErrores(validar(nuevos));
  }

  // Valida y, si todo está bien, muestra el mensaje de éxito
  function enviar(evento) {
    evento.preventDefault();
    const encontrados = validar(datos);
    setErrores(encontrados);
    setIntentado(true);

    if (Object.keys(encontrados).length > 0) {
      setMensaje({
        tipo: "error",
        titulo: "Revisa los datos",
        texto: "Hay campos vacíos o con datos incorrectos. Corrígelos e inténtalo de nuevo.",
      });
      return;
    }
    setMensaje({
      tipo: "ok",
      titulo: "¡Cita solicitada!",
      texto: "Recibimos tu solicitud. Te contactaremos para confirmar el horario.",
    });
    setDatos(vacio);
    setErrores({});
    setIntentado(false);
  }

  // Clase de Bootstrap según el estado del campo
  const clase = (campo) =>
    `form-control ${intentado ? (errores[campo] ? "is-invalid" : "is-valid") : ""}`;

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="form-panel">
            <h2 className="titulo-seccion mb-4">Solicitar una cita</h2>
            <form onSubmit={enviar} noValidate>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre completo</label>
                <input id="nombre" name="nombre" type="text" className={clase("nombre")}
                  value={datos.nombre} onChange={cambiar} />
                <div className="invalid-feedback">{errores.nombre}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">Teléfono</label>
                <input id="telefono" name="telefono" type="tel" className={clase("telefono")}
                  value={datos.telefono} onChange={cambiar} />
                <div className="invalid-feedback">{errores.telefono}</div>
              </div>
              <div className="mb-3">
                <label htmlFor="servicio" className="form-label">Servicio</label>
                <select id="servicio" name="servicio"
                  className={`form-select ${intentado ? (errores.servicio ? "is-invalid" : "is-valid") : ""}`}
                  value={datos.servicio} onChange={cambiar}>
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => (
                    <option key={s.id} value={s.nombre}>{s.nombre}</option>
                  ))}
                </select>
                <div className="invalid-feedback">{errores.servicio}</div>
              </div>
              <div className="mb-4">
                <label htmlFor="fecha" className="form-label">Fecha deseada</label>
                <input id="fecha" name="fecha" type="date" min={fechaHoy()} className={clase("fecha")}
                  value={datos.fecha} onChange={cambiar} />
                <div className="invalid-feedback">{errores.fecha}</div>
              </div>
              <button type="submit" className="btn btn-sm-morado w-100 btn-lg">
                Solicitar cita
              </button>
            </form>
          </div>
        </div>
      </div>
      {mensaje && <Mensaje {...mensaje} onCerrar={() => setMensaje(null)} />}
    </>
  );
}
