import SesionDAO from "../../../dao/sesionDAO.js";

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatosUsuario();
    agregarEventoCerrarSesion();
});

async function mostrarDatosUsuario() {
    let respuesta = await new SesionDAO().obtenerSesion();
    if (respuesta.estado) {
        let datosUsuario = respuesta.datos.usuario;
        let datosDiv = document.getElementById('datos');
        datosDiv.innerHTML = `
            <div class="contenedor">
                <p class="indicador">Nombre: </p>
                <p>${datosUsuario.nombre}</p>
            </div>
            <div class="contenedor">
                <p class="indicador">Apellido: </p>
                <p>${datosUsuario.apellido}</p>
            </div>
            <div class="contenedor">
                <p class="indicador">Email: </p>
                <p>${datosUsuario.email}</p>
            </div>
            <div class="contenedor">
                <p class="indicador">Teléfono: </p>
                <p>${datosUsuario.telefono}</p>
            </div>
        `;
    } else {
        alert("No se ha encontrado una sesión activa.");
        window.location.href = "../Login/login.html";
    }
}

function agregarEventoCerrarSesion() {
    let cerrarSesionBtn = document.getElementById('cerrarSesion');
    cerrarSesionBtn.addEventListener('click', cerrarSesion);
}

async function cerrarSesion() {
    let respuesta = await new SesionDAO().cerrarSesion();
    console.log('Respuesta del servidor:', respuesta);
    if (respuesta.estado) {
        localStorage.removeItem('usuario');
        alert("Sesión cerrada correctamente.");
        window.location.href = "../Login/login.html";
    } else {
        alert("Error al cerrar sesión.");
    }
}