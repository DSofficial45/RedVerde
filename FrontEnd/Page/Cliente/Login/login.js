import SesionDAO from "../../../dao/sesionDAO";

window.onload = () => {
    agregarEvento();
}

function agregarEvento(){
    let formElement = document.querySelector("#login");
    formElement.onsubmit = (e)=>{
        e.proventDefault();
        let email = formElement.email.value;
        let password = formElement.password.value;

        iniciarSesion(email, password);
    }
}

async function iniciarSesion(email, password) {
    let respuesta = await new SesionDAO().iniciarSesion(email, password);
    if (respuesta.estado) {
        alert("Sesion iniciada correctamente");
        window.location.href = "../PagInicio/index.html";  
    } else {
        alert("Error al iniciar sesion");
        window.location.href = "../registro/registro.html"; 
    }
}