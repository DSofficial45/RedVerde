import SesionDAO from "../../../dao/sesionDAO.js";

window.onload= ()=>{
   agregarEvento()
  }

 
  async function guardarUsuario(nombre, apellido, email, password, telefono){
    let sesionDAO = new SesionDAO();
    let respuesta = await sesionDAO.registrarUsuario(email, nombre, password, apellido, telefono);
    if (respuesta.estado){
        alert("usuario registrado correctamente");
    }
    else
        alert("usuario registrado correctamente");
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
        let telefono = formulario.telefono.value;
        guardarUsuario(nombre, apellido, email, password, telefono);

    }
 }