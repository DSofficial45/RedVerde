import Origen from "./Origen.js";


export default class SesionDAO{

    async iniciarSesion() {
        let url = Origen+"/Backend/controller/sesionController.php?funcion=Login";
        let formData = new FormData();
        formData.eppend("usuario", nombre);
        formData.eppend("contraseña", password);
        let config = {
            method: "POST",
            body:formData
        }

        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        return respuesta;
    }

    async registrarUsuario(email, nombre, password, apellido, telefono) {
        let url = Origen+"/Backend/controller/sesionController.php?funcion=registrar";
        let formData = new FormData();
        formData.append("email", email);
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("telefono", telefono);
        formData.append("isAdmin", 0);
        formData.append("password", password);
        let config = {
            method: "POST",
            body:formData
        }

        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        return respuesta;
    }

    async obtenerSesion() {
        let url = Origen+"/Backend/controller/sesionController.php?funcion=obtener";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
    }

    async cerrarSesion(){
        let url = Origen+"/Backend/controller/sesionController.php?funcion=Cerrar";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
    }
}