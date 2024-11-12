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
  //  alert(respuesta.datos);
    if (respuesta.estado) {
        if(respuesta.datos === "0"){
            window.location.href = "../PagInicial/index.html";  
        }else{
            window.location.href = "../../ADMIN/Inicio/inicioADMIN.html";  
        }
    } else {
        alert("Error al iniciar sesion");
    }
}