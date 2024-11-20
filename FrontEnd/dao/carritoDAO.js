export default class carritoDAO {
    constructor() {

    }
    // Función para obtener el carrito desde la base de datos y devolverlo en formato JSON
    obtenerCarrito() {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        if (carrito == null) {
            carrito = [];
        }
        return carrito;

    }

    // Función para confirmar una compra


    // Función para eliminar un producto del carrito
    eliminarProductoCarrito(idProducto) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.filter(producto => producto.productId != idProducto);
        this.guardarCarrito(nuevoCarrito);
        // Implementación pendiente
    }



    guardarCarrito(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Función para modificar el stock de un producto en el carrito
    modificarStockCarrito(quantity, idProducto) {

        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto) {
                producto.quantity = quantity;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);

        // Implementación pendiente
    }

    aumentarCantidadCarrito(idProducto,talle) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto) {
                producto.quantity++;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(idProducto , talle) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.productId == idProducto && producto.quantity > 1) {
                producto.quantity--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    // Función para agregar un producto al carrito
    agregarProductoCarrito(producto) {
        let carrito = this.obtenerCarrito();
        let productoExistente = carrito.find(producto => producto.productId == producto.idProducto);
        if (productoExistente == null) {
            carrito.push(producto);
            this.guardarCarrito(carrito);
            
        }else{
            this.eliminarProductoCarrito(producto.idProducto,producto);
            productoExistente.quantity += producto.stoc;
            let carritoSinExistente = this.obtenerCarrito();
            carritoSinExistente.push(productoExistente);
            this.guardarCarrito(carritoSinExistente);

        }
       
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