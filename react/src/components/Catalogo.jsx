import { useState } from "react";
import servicios from "../datos/servicios.js";
import TarjetaServicio from "./TarjetaServicio.jsx";

/**
 * Quita tildes y mayúsculas para comparar textos.
 * @param {string} texto
 * @returns {string}
 */
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
}

/**
 * Catálogo de servicios del spa con buscador.
 * Reemplaza dentro de spa.html el catálogo hecho en HTML.
 */
export default function Catalogo() {
  // Texto que la persona escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Servicios que coinciden con la búsqueda
  const visibles = servicios.filter((s) =>
    normalizar(s.nombre).includes(normalizar(busqueda))
  );

  return (
    <>
      <h1 className="titulo-seccion mb-2">Catálogo de servicios</h1>
      <p className="mb-4">Conoce nuestros servicios y técnicas de uñas.</p>

      <div className="row mb-4">
        <div className="col-md-6 col-lg-4">
          <label htmlFor="buscarServicio" className="form-label fw-semibold">
            Buscar servicio
          </label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input id="buscarServicio" type="search" className="form-control"
              placeholder="Escribe el nombre de un servicio"
              value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="row g-4">
        {visibles.map((s) => (
          <TarjetaServicio key={s.id} {...s} />
        ))}
      </div>
      <p className="mt-3 fw-semibold" aria-live="polite">
        {visibles.length === 0 && "No se encontraron servicios con ese nombre."}
      </p>
    </>
  );
}
