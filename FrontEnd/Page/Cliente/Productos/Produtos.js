import productoDAO from "../../../dao/productoDAO.js";

window.onload = async () => {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
}

document.querySelector("#filtroSelect").addEventListener("change", function() { filtrarProductos(this.value); });

function filtrarProductos(filtro) {
    // Suponiendo que `productos` es un array global de productos.
    let productosFiltrados = [...productos];

    switch (filtro) {
        case "stockAsc":
            productosFiltrados.sort((a, b) => a.stock - b.stock);
            break;
        case "stockDesc":
            productosFiltrados.sort((a, b) => b.stock - a.stock);
            break;
        case "precioAsc":
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case "precioDesc":
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case "ventasAsc":
            productosFiltrados.sort((a, b) => a.ventas - b.ventas);
            break;
        case "ventasDesc":
            productosFiltrados.sort((a, b) => b.ventas - a.ventas);
            break;
        case "ofertaAsc":
            productosFiltrados.sort((a, b) => a.oferta - b.oferta);
            break;
        case "ofertaDesc":
            productosFiltrados.sort((a, b) => b.oferta - a.oferta);
            break;
        default:
            break;
    }

    // Mostrar los productos filtrados en la tabla
    mostrarProductos(productosFiltrados);
}

async function obtenerProductos() {
    let respuesta = await new productoDAO().obtenerProductos();
    return respuesta.datos;
}

function mostrarProductos(productos) {
    let datosElement = document.querySelector("#tbodygeneral");
    datosElement.innerHTML = "";
    console.log(productos);
    productos.forEach(producto => {
        datosElement.innerHTML += `
        <div>
            <img src="${producto.urlImg}" alt="Producto 1" width="100px" height="100px">
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Oferta: %${producto.oferta}</p>
            <p>Stock: ${producto.stock}</p>
            <button class="botonAccion">Poner en el carrito</button>
        </div>
    `
});
}