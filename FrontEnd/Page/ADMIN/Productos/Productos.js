import productoDAO from "../../../dao/productoDAO.js";

/*let nombreFiltro = "";
let precioFiltro = "";
let allProductos = [];*/

let productos = []; // Declarar productos como variable global

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
        let ofertaTexto = "Sin oferta";
        if (producto.oferta && producto.oferta > 0) {
            ofertaTexto = `${producto.oferta}%`;
        }

        let filaHTML = `
        <tr>
            <td><img src="${producto.urlImg}" alt="Producto ${producto.nombre}" width="100px" height="100px"></td>
            <td>${producto.nombre}</td>
            <td>${producto.fecha}</td>
            <td>$${producto.precio}</td>
            <td>${ofertaTexto}</td>
            <td>${producto.stock}</td>
            <td class="descripcion">${producto.descripcion}</td>
            <td>${producto.nombreCategoria}</td>
            <td><button class="botonAccion">Modificar</button></td>
            <td><button class="botonAccion">Eliminar</button></td>
        </tr>
        `;

        datosElement.innerHTML += filaHTML;
    });
}

function agregarEvento(){
    let formElement = document.querySelector("#formularioProducto");
    formElement.onsubmit = (e)=>{
        e.preventDefault();
        let nombre = formElement.nombre.value;    
        let descripcion = formElement.descripcion.value;
        let precio = formElement.precio.value;    
        let oferta = formElement.oferta.value;
        let categoria = formElement.categoria.value;    
        let imagen = formElement.pImagen.files[0];
        let stock = formElement.stock.value;

        agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock);
    }
}

async function agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock) {
    let respuesta = await new productoDAO().agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock);    
    let productos = await obtenerProductos();
    mostrarProductos(productos);
  
}
