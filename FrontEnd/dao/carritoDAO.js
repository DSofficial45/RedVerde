
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
            if (producto.stock < producto.stockDisponible) {
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

obtenerStockProducto(id) {
    // Aquí deberías implementar el código que obtenga el stock real del producto
    // Esto depende de cómo accedas a tu base de datos o API. Por ejemplo:
    // Suponiendo que tienes una base de datos o API que te devuelve los datos del producto
    let producto = this.obtenerProducto(id); // Obtener el producto desde la base de datos
    return producto.stock; // Devolver el stock real
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
            // Si el producto ya existe, actualizamos su cantidad
            productoExistente.stock += producto.stock; // Se asume que `producto.stock` está definida
        }
        
        console.log(carrito);
        this.guardarCarrito(carrito); // Guardamos los cambios
    }    

    confirmarCompra(direccion, metodoEnvio, metodoPago, fechaVenta) {
        let products = this.obtenerCarrito();
        let venta = {
            direccion: direccion,
            metodoEnvio: metodoEnvio,
            metodoPago: metodoPago,
            fechaVenta: fechaVenta,
            products: products
        }

    }
}