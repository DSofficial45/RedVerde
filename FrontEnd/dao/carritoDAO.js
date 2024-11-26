import Origen from "./Origen.js";

export default class carritoDAo {
    constructor() {

    }

    obtenerCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        if (carrito == null) {
            carrito = [];
        }
        return carrito;
        
    }

    guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

 // Eliminar un producto del carrito
 eliminarProductoCarrito(id) {  // Ahora recibimos solo el id del producto
    let carrito = this.obtenerCarrito();
    let nuevoCarrito = carrito.filter(p => p.id !== id); // Filtramos usando el id
    this.guardarCarrito(nuevoCarrito); // Guardar el carrito actualizado
}

// Aumentar la cantidad de un producto en el carrito
aumentarCantidadCarrito(id) {
    let carrito = this.obtenerCarrito();
    let nuevoCarrito = carrito.map(producto => {
        if (producto.id === id) {
            // Verificar si la cantidad actual es menor que el stock disponible
            if (producto.stock < producto.stockReal) {
                producto.stock++; // Aumentar la cantidad si hay stock disponible
            } else {
                alert("No puedes aumentar la cantidad más allá del stock disponible");
            }
        }
        return producto;
    });

    this.guardarCarrito(nuevoCarrito); // Guardar el carrito actualizado
}

// Disminuir la cantidad de un producto en el carrito
disminuirCantidadCarrito(id) {
    let carrito = this.obtenerCarrito();

    // Buscar el producto en el carrito y disminuir su cantidad si es posible
    let nuevoCarrito = carrito.map(producto => {
        if (producto.id === id && producto.stock > 1) {
            producto.stock--; // Disminuir la cantidad solo si es mayor a 1
        }
        return producto;
    });

    this.guardarCarrito(nuevoCarrito); // Guardar el carrito actualizado
}
    
    /*eliminarProductoCarrito(producto) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.filter(p => p.id != producto.id);
        this.guardarCarrito(nuevoCarrito);
        // Implementación pendiente
    }

    aumentarCantidadCarrito(producto) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id == idProducto) {
                producto.stock++;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(producto) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id == idProducto && producto.stock > 1) {
                producto.stock--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }*/

    // Función para agregar un producto al carrito
    
    agregarProductoCarrito(producto) { 
        let carrito = this.obtenerCarrito();
        
        // Cambiar el nombre de la variable dentro del find para evitar confusión
        let productoExistente = carrito.find(p => p.id === producto.id);
        
        if (productoExistente === undefined) {
            // Si el producto no existe, lo agregamos al carrito
            carrito.push(producto);
        } else {
            // Si el producto ya existe, verificamos que la cantidad no exceda el stockReal
            if (productoExistente.stock + producto.stock <= productoExistente.stockReal) {
                // Si la cantidad no excede el stock real, actualizamos la cantidad
                productoExistente.stock += producto.stock; // Se asume que `producto.stock` está definida
            } else {
                // Si no se puede aumentar más porque excede el stock disponible, mostramos un mensaje
                alert("No puedes agregar más unidades de este producto. El stock disponible es: " + productoExistente.stockReal);
            }
        }
        
        console.log(carrito);
        this.guardarCarrito(carrito); // Guardamos los cambios
    }

    // Método para confirmar la compra
    async confirmarCompra(datosCompra) {
        // Enviar los datos al backend (puedes usar fetch o AJAX)
        let url = `${Origen}/Backend/controller/compraController.php?funcion=confirmar`;
        
        // Configuración de la solicitud
        let config = {
            method: "POST",
            body: JSON.stringify(datosCompra),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            // Realizamos la solicitud al servidor
            let respuestaConsulta = await fetch(url, config);

            // Verificar si la respuesta fue exitosa
            if (!respuestaConsulta.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            // Convertimos la respuesta en JSON
            let respuesta = await respuestaConsulta.json();
            return respuesta;

        } catch (error) {
            console.error('Error al realizar la compra:', error);
            return { estado: false, mensaje: error.message };
        }
    }  
       
}
