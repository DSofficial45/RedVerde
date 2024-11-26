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

    eliminarProductoCarrito(id) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.filter(p => p.id !== id);
        this.guardarCarrito(nuevoCarrito);
    }

    aumentarCantidadCarrito(id) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id === id) {
                if (producto.stock < producto.stockReal) {
                    producto.stock++;
                } else {
                    alert("No puedes aumentar la cantidad más allá del stock disponible");
                }
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    disminuirCantidadCarrito(id) {
        let carrito = this.obtenerCarrito();
        let nuevoCarrito = carrito.map(producto => {
            if (producto.id === id && producto.stock > 1) {
                producto.stock--;
            }
            return producto;
        });
        this.guardarCarrito(nuevoCarrito);
    }

    agregarProductoCarrito(producto) {
        let carrito = this.obtenerCarrito();
        let productoExistente = carrito.find(p => p.id === producto.id);
        
        if (productoExistente === undefined) {
            carrito.push(producto);
        } else {
            if (productoExistente.stock + producto.stock <= productoExistente.stockReal) {
                productoExistente.stock += producto.stock;
            } else {
                alert("No puedes agregar más unidades de este producto. El stock disponible es: " + productoExistente.stockReal);
            }
        }
        console.log(carrito);
        this.guardarCarrito(carrito);
    }

    async confirmarCompra(datosCompra) {
        let url = `${Origen}/Backend/controller/compraController.php?funcion=confirmar`;

        let config = {
            method: "POST",
            body: JSON.stringify(datosCompra),
            headers: {
                "Content-Type": "application/json"
            }
        };

        let respuestaConsulta = await fetch(url, config);

        if (!respuestaConsulta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        let respuesta = await respuestaConsulta.json();
        return respuesta;
    }
}
