export default class SesionDAO{

    async iniciarSesion() {
        let url = "http://localhost/RedVerde-2/Backend/controller/sesionController.php";
        let formData = new FormData();
        formData.eppend("password", password);
        let config = {
            method: "POST",
            body:formData
        }

        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
    }

    async obtenerSesion() {
        let url = "http://localhost/RedVerde-2/Backend/controller/sesionController.php";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
    }

    async cerrarSesion(){
        let url = "http://localhost/RedVerde-2/Backend/controller/sesionController.php";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
    }
}