/**
 * Ventana de mensaje de éxito o de error.
 * @param {{tipo: "ok"|"error", titulo: string, texto: string, onCerrar: Function}} props
 */
export default function Mensaje({ tipo, titulo, texto, onCerrar }) {
  const icono =
    tipo === "ok"
      ? "bi bi-check-circle-fill display-3 text-success"
      : "bi bi-x-circle-fill display-3 text-danger";

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content text-center p-3">
            <div className="modal-body">
              <i className={icono}></i>
              <h2 className="h4 mt-2">{titulo}</h2>
              <p className="mb-0">{texto}</p>
            </div>
            <div className="modal-footer justify-content-center border-0">
              <button type="button" className="btn btn-sm-morado px-5" onClick={onCerrar}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
