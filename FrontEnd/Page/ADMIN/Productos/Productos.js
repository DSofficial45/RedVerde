import productoDAO from "../../../dao/productoDAO.js";

let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];

window.onload = async () => {
    let productos = await obtenerProductos();
    allProductos = productos;
    mostrarProductos(productos);
    agregarEventosFiltro();
    agregarEvento();
}

async function obtenerProductos() {
    let respuesta = await new productoDAO().obtenerProducto();
    return respuesta.datos;
}

function mostrarProductos(productos) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
    console.log(productos);
    productos.forEach(producto => {
        datosElement.innerHTML += `
        <tr>
            <td><img src="path/to/image1.jpg" alt="Producto 1" width="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>...</td>
            <td>${producto.stock}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categorias}</td>
            <td>35</td>
            <button>Modificar</button>
            <button>Eliminar</button>
        </tr>
    `
    });
}

function agregarEventosFiltro() {
    let inputNombre = document.querySelector("#filtroNombre");
    let inputPrecio = document.querySelector("#filtroPrecio");

    inputNombre.onkeyup = () => {
        nombreFiltro = inputNombre.value.toLowerCase();
        filtrarProductos();
    }
    
    inputPrecio.oninput = () => {
        precioFiltro = parseFloat(inputPrecio.value);
        document.querySelector("#precioValor").textContent = $${precioFiltro}; // Actualiza el texto que muestra el valor
        filtrarProductos();
    }
}

function filtrarProductos() {
    let productosFiltrados = allProductos.filter(producto => {
        let nombreCoincide = producto.nombre.toLowerCase().startsWith(nombreFiltro);
        let precioCoincide = producto.precio <= precioFiltro;

        return nombreCoincide && precioCoincide; 
    });

    mostrarProductos(productosFiltrados); 
}