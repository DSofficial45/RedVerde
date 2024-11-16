import Origen from "./Origen.js";

export default class productoDAO{
   
    async obtenerProductos(){
        let url = Origen+"/Backend/controller/productosController.php?funcion=obtener";
        let respuestaConsulta = await fetch(url);
        let respuesta = await respuestaConsulta.json();
        console.log("respuesta", respuesta);
        return respuesta;
    }

    async eliminarProducto(){
        let url = Origen+"/Backend/controller/productosController.php?funcion=eliminar";
        let respuestaConsulta = await fetch(url, config);
        let respuesta = await respuestaConsulta.json();
        return respuesta;
    }

    async agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock) {
        let url = `${Origen}/Backend/controller/productosController.php?funcion=agregar`;
    
        const fecha = new Date().toISOString().split('T')[0];
    
        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("categoria", categoria);
        formData.append("oferta", oferta);
        formData.append("imagen", imagen);
        formData.append("stock", stock);
        formData.append("fecha", fecha);
    
        let config = {
            method: "POST",
            body: formData
        };
    
        try {
            let respuestaConsulta = await fetch(url, config);
            if (!respuestaConsulta.ok) {
                throw new Error('Error en la solicitud');
            }
            let respuesta = await respuestaConsulta.json();
            console.log("Respuesta agregarProducto:", respuesta);
            return respuesta;
        } catch (error) {
            console.error("Error en agregarProducto:", error);
            return { success: false, message: error.message };
        }
    }

    async agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock) {
        let url = `${Origen}/Backend/controller/productosController.php?funcion=agregar`;
    
        const fecha = new Date().toISOString().split('T')[0];
    
        let formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("categoria", categoria);
        formData.append("oferta", oferta);
        formData.append("imagen", imagen);
        formData.append("stock", stock);
        formData.append("fecha", fecha);
    
        let config = {
            method: "POST",
            body: formData
        };
    
        try {
            let respuestaConsulta = await fetch(url, config);
            if (!respuestaConsulta.ok) {
                throw new Error('Error en la solicitud');
            }
            let respuesta = await respuestaConsulta.json();
            console.log("Respuesta agregarProducto:", respuesta);
            return respuesta;
        } catch (error) {
            console.error("Error en agregarProducto:", error);
            return { success: false, message: error.message };
        }
    }
    

}