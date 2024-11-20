import SesionDAO from "../../../dao/sesionDAO.js";

window.onload = () => {
    agregarEvento();
}

function agregarEvento(){
    let formElement = document.querySelector("#login");
    formElement.onsubmit = (e)=>{
        e.preventDefault();
        let email = formElement.email.value;
        let password = formElement.password.value;

        iniciarSesion(email, password);
    }
}

async function iniciarSesion(email, password) {
    let respuesta = await new SesionDAO().iniciarSesion(email, password);
    if (respuesta.estado && respuesta.datos) {
        console.log("Datos de usuario:", respuesta.datos);
        console.log(respuesta.datos);
        const isAdmin =respuesta.datos.usuario.isAdmin;
        localStorage.setItem("usuario", JSON.stringify(respuesta.datos));
        console.log(isAdmin);   
        window.location.href = isAdmin == 1
            ? "../../ADMIN/Inicio/inicioADMIN.html"
            : "../PagInicial/index.html";
    } else {
        alert("Error al iniciar sesión. Verifique sus credenciales.");
    }
}