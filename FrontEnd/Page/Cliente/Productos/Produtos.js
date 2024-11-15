import productoDAO from "../../../dao/productoDAO.js";

window.onload = async () => {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    
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