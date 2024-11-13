import productoDAO from "../../../dao/productoDAO.js";

/*let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];*/

window.onload = async () => {
    let productos = await obtenerProductos();
    //allProductos = productos;
    mostrarProductos(productos);
    //agregarEventosFiltro();
    agregarEvento();
}

async function obtenerProductos() {
    let respuesta = await new productoDAO().obtenerProductos();
    return respuesta.datos;
}

function mostrarProductos(productos) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
    console.log(productos);
    productos.forEach(producto => {
        datosElement.innerHTML += `
        <tr>
            <td><img src="${producto.imagen}" alt="Producto 1" width="50"></td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.stock}</td>
            <td>${producto.descripcion}</td>
            <td>${producto.categorias}</td>
            <button>Modificar</button>
            <button>Eliminar</button>
        </tr>
    `
    });
}

function agregarEvento(){
    let formElement = document.querySelector("#crear");
    formElement.onsubmit = (e)=>{
        e.preventDefault();
        let nombre = formElement.nombre.value;    
        let descripcion = formElement.descripcion.value;
        let precio = formElement.precio.value;    
        let oferta = formElement.oferta.value;
        let categoria = formElement.categoria.value;    
        let imagen = formElement.imagen.value;
        let stock = formElement.stock.value;

        agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock);
    }
}

async function agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock) {
    let respuesta = await new productoDAO().agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock);
    return respuesta.datos;
}

/*function agregarEventosFiltro() {
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
}*/