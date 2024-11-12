import SesionDAO from "../../../dao/sesionDAO.js";

window.onload= ()=>{
   agregarEvento()
  }

 
  async function guardarUsuario(nombre, apellido, email, password, telefono){
    let sesionDAO = new SesionDAO();
    let respuesta = await sesionDAO.registrarUsuario(email, nombre, password, apellido, telefono);
    console.log(respuesta);
    if (respuesta.estado == true) {
        window.location.href = "../Login/login.html";
    } else {
        alert("Error al registrar");
    }
    }

 function agregarEvento(){
    let formulario = document.querySelector("#registro");
    console.log(formulario);
    formulario.onsubmit =(e)=>{
        e.preventDefault();
        let nombre = formulario.nombre.value;
        let apellido = formulario.apellido.value;
        let email = formulario.email.value;
        let password = formulario.password.value;
        let conpassword = formulario.conpassword.value;
        let telefono = formulario.telefono.value;
        if (password === conpassword){
        guardarUsuario(nombre, apellido, email, password, telefono);
        } else{
        alert("Contraseñas no coinciden");
        }

    }
 }