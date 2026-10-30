document,addEventListener("DOMContentLoaded",()=>{

const modalEl = document.getElementById("modalMensaje");

function mostrarMensaje (tipo,titulo,texto){
    if (modalEl){alert(texto);return;}
    const icono =document.getElementById("modalIcono");
    icono.className = tipo === "ok"
      ?"bi bi-check-circle-fill display-3 text-success"
      :"bi bi-x-circle-fill display-3 text-danger;"
}












}) 
