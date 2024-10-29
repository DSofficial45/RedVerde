import Origen from "./Origen";

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

    async registrarUsuario() {
        let url = Origen+"/Backend/controller/sesionController.php?funcion=Registrar"
        let formData = new FormData();
        formData.eppend("email", email);
        formData.eppend("nombre", nombre);
        formData.eppend("apellido", apellido);
        formData.eppend("telefono", telefono);
        formData.eppend("password", password);
        let config 
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