/**
 * SM MasterNails - Lógica del front-end
 *
 * Módulo de interactividad del sitio web. Se carga en todas las páginas
 * y activa solo lo que encuentra en cada una:
 *   1. Buscadores de servicios (spa.html) y de cursos (academia.html).
 *   2. Validación de los formularios: cita, contacto, login y solicitud de curso.
 *   3. Mensajes de éxito o error en una ventana modal de Bootstrap.
 *   4. Límites de fecha en los campos de fecha.
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Ventana modal de Bootstrap (está en spa, academia, contacto y login)
  const modalEl = document.getElementById("modalMensaje");

  // ---------------------------------------------------------------
  // Utilidades
  // ---------------------------------------------------------------

  /**
   * Muestra una ventana modal con un mensaje.
   * Si el modal no existe en la página, usa alert como respaldo.
   * @param {"ok"|"error"} tipo   Define el ícono y el color.
   * @param {string} titulo       Título del mensaje.
   * @param {string} texto        Texto del mensaje.
   */
  function mostrarMensaje(tipo, titulo, texto) {
    if (!modalEl || typeof bootstrap === "undefined") {
      alert(`${titulo}\n${texto}`);
      return;
    }
    const icono = document.getElementById("modalIcono");
    icono.className =
      tipo === "ok"
        ? "bi bi-check-circle-fill display-3 text-success"
        : "bi bi-x-circle-fill display-3 text-danger";
    document.getElementById("modalMensajeTitulo").textContent = titulo;
    document.getElementById("modalMensajeTexto").textContent = texto;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  /**
   * Quita tildes y pasa a minúsculas para comparar textos sin distinguir
   * mayúsculas ni acentos (por ejemplo "Acrílicas" y "acrilicas").
   * @param {string} texto
   * @returns {string}
   */
  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .trim();
  }

  /**
   * Convierte una fecha en texto aaaa-mm-dd (formato del input date).
   * @param {Date} fecha
   * @returns {string}
   */
  function formatoFecha(fecha) {
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  }

  // ---------------------------------------------------------------
  // 1. Buscadores
  // ---------------------------------------------------------------

  /**
   * Activa un buscador que oculta las tarjetas que no coinciden con el texto.
   * @param {string} idInput     Id del campo de búsqueda.
   * @param {string} selector    Selector de las tarjetas (cada una con data-nombre).
   * @param {string} idMensaje   Id del párrafo donde se informa el resultado.
   * @param {string} plural      Palabra para el mensaje (servicios, cursos).
   */
  function activarBuscador(idInput, selector, idMensaje, plural) {
    const campo = document.getElementById(idInput);
    if (!campo) return; // la página actual no tiene este buscador

    const tarjetas = document.querySelectorAll(selector);
    const mensaje = document.getElementById(idMensaje);

    campo.addEventListener("input", () => {
      const busqueda = normalizar(campo.value);
      let visibles = 0;

      tarjetas.forEach((tarjeta) => {
        const coincide = normalizar(tarjeta.dataset.nombre).includes(busqueda);
        tarjeta.classList.toggle("d-none", !coincide);
        if (coincide) visibles++;
      });

      if (!mensaje) return;
      if (visibles === 0) {
        mensaje.textContent = `No se encontraron ${plural} con ese nombre.`;
      } else if (busqueda !== "") {
        mensaje.textContent = `Resultados encontrados: ${visibles}.`;
      } else {
        mensaje.textContent = "";
      }
    });
  }

  activarBuscador("buscarServicio", ".servicio", "mensajeBusqueda", "servicios");
  activarBuscador("buscarCurso", ".curso", "mensajeCursos", "cursos");

  // ---------------------------------------------------------------
  // 2. Límites de fecha
  // ---------------------------------------------------------------

  const hoy = new Date();

  // La cita del spa no puede ser en una fecha pasada.
  const fechaCita = document.getElementById("fechaCita");
  if (fechaCita) fechaCita.min = formatoFecha(hoy);

  // La cita de la página de contacto no puede ser anterior a este momento.
  const citaPreferida = document.getElementById("citaPreferida");
  if (citaPreferida) {
    citaPreferida.min = `${formatoFecha(hoy)}T${String(hoy.getHours()).padStart(2, "0")}:${String(hoy.getMinutes()).padStart(2, "0")}`;
  }

  // La fecha de nacimiento no puede ser futura.
  const nacimiento = document.getElementById("nacimiento");
  if (nacimiento) nacimiento.max = formatoFecha(hoy);

  // ---------------------------------------------------------------
  // 3. Formularios
  // ---------------------------------------------------------------

  /**
   * Activa la validación de un formulario con las reglas de HTML5
   * (required, minlength, pattern, type) y los estilos de Bootstrap.
   * @param {string} idFormulario
   * @param {Object} opciones
   * @param {string} opciones.titulo       Título del mensaje de éxito.
   * @param {string} opciones.texto        Texto del mensaje de éxito.
   * @param {boolean} [opciones.limpiar]   Si es true, vacía el formulario al enviarlo.
   */
  function activarFormulario(idFormulario, opciones) {
    const formulario = document.getElementById(idFormulario);
    if (!formulario) return; // la página actual no tiene este formulario

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault(); // no se recarga la página
      formulario.classList.add("was-validated");

      if (!formulario.checkValidity()) {
        mostrarMensaje(
          "error",
          "Revisa los datos",
          "Hay campos vacíos o con datos incorrectos. Corrígelos e inténtalo de nuevo."
        );
        return;
      }

      mostrarMensaje("ok", opciones.titulo, opciones.texto);
      if (opciones.limpiar !== false) {
        formulario.reset();
        formulario.classList.remove("was-validated");
      }
    });
  }

  activarFormulario("formularioCita", {
    titulo: "¡Cita solicitada!",
    texto: "Recibimos tu solicitud. Te contactaremos para confirmar el horario.",
  });

  activarFormulario("formularioContacto", {
    titulo: "¡Gracias por preferirnos!",
    texto: "Recibimos tus datos. Pronto nos pondremos en contacto contigo.",
  });

  activarFormulario("formularioCurso", {
    titulo: "¡Solicitud enviada!",
    texto: "Te enviaremos la información del curso a tu correo.",
  });

  activarFormulario("formularioLogin", {
    titulo: "Datos correctos",
    texto: "Tus datos tienen el formato válido para iniciar sesión.",
  });
});
