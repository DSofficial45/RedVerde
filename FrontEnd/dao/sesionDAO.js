import Origen from "./Origen.js";

export default class SesionDAO {
    async iniciarSesion(email, password) {
        let url = Origen + "/Backend/controller/sesionController.php?funcion=login";
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        let config = {
            method: "POST",
            body: formData
        };
        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        if (respuesta.estado) {
            if (respuesta.datos !== null && typeof respuesta.datos === 'object') {
                localStorage.setItem('usuario', JSON.stringify(respuesta.datos));
            } else {
                console.error("Datos del usuario no válidos");
            }
        }
        return respuesta;
    }

    async registrarUsuario(email, nombre, password, apellido, telefono) {
        let url = Origen + "/Backend/controller/sesionController.php?funcion=registrar";
        let formData = new FormData();
        formData.append("email", email);
        formData.append("nombre", nombre);
        formData.append("apellido", apellido);
        formData.append("telefono", telefono);
        formData.append("password", password);
        let config = {
            method: "POST",
            body: formData
        }
        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        return respuesta;
    }

    async obtenerSesion() {
        let url = Origen + "/Backend/controller/sesionController.php?funcion=obtener";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
        return respuesta;
    }

    async cerrarSesion() {
        let url = Origen + "/Backend/controller/sesionController.php?funcion=cerrar";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
        if (respuesta.estado) {
            localStorage.removeItem('usuario');
        }
        return respuesta;
    }
}