import SesionDAO from "../../../dao/sesionDAO.js";

document.addEventListener("DOMContentLoaded", () => {
    mostrarDatosUsuario();
    agregarEventoCerrarSesion();
});

function mostrarDatosUsuario() {
    let datosUsuario = JSON.parse(localStorage.getItem('usuario'));
    if (datosUsuario) {
        let datosDiv = document.getElementById('datos');
        datosDiv.innerHTML = `
            <p>Nombre: ${datosUsuario.nombre}</p>
            <p>Apellido: ${datosUsuario.apellido}</p>
            <p>Email: ${datosUsuario.email}</p>
            <p>Teléfono: ${datosUsuario.telefono}</p>
        `;
    } else {
        alert("No se encontraron datos del usuario. Por favor, inicia sesión.");
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