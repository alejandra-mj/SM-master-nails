/**
 * Tarjeta de un servicio del catálogo del spa.
 * @param {{nombre: string, descripcion: string, icono: string, rosa: boolean}} props
 */
export default function TarjetaServicio({ nombre, descripcion, icono, rosa }) {
  return (
    <div className="col-sm-6 col-lg-4 col-xl-3">
      <div className="card card-sm p-3 h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <span className={`icono-circulo ${rosa ? "rosa" : ""}`}>
            <i className={`bi ${icono}`}></i>
          </span>
          <h3 className="h5 mb-0">{nombre}</h3>
        </div>
        <p className="mb-0">{descripcion}</p>
      </div>
    </div>
  );
}
