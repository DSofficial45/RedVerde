import productoDAO from "../../../dao/productoDAO.js";
let idSelected = null;

window.onload = async () => {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
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
        ofertaTexto = `${producto.oferta}%`; }
        
    let filaHTML = document.createElement("tr");
    filaHTML.innerHTML = `
            <td><img src="${producto.urlImg}" alt="Producto ${producto.nombre}" width="100px" height="100px"></td>
            <td>${producto.nombre}</td>
            <td>${producto.fecha}</td>
            <td>$${producto.precio}</td>
            <td>${ofertaTexto}</td>
            <td>${producto.stock}</td>
            <td class="descripcion">${producto.descripcion}</td>
            <td>${producto.nombreCategoria}</td> 
             `;
        let tdModificar = document.createElement("td");
        let tdEliminar = document.createElement("td");
        let botonModificar = document.createElement("button");
        let botonEliminar = document.createElement("button");
        botonModificar.classList.add("botonAccion");
        botonModificar.classList.add("modificar");
        botonModificar.textContent = "Modificar";
        botonModificar.addEventListener("click", function() {
            idSelected = producto.id;
            console.log(idSelected);
            rellenarFormulario(producto);
        });
        botonEliminar.classList.add("botonAccion");
        botonEliminar.classList.add("eliminar");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", async function() {
            eliminarProducto(producto.id);
    
        });
    filaHTML.appendChild(tdModificar);
    filaHTML.appendChild(tdEliminar);
    tdModificar.appendChild(botonModificar);
    tdEliminar.appendChild(botonEliminar);
    datosElement.appendChild(filaHTML);
    });

}

async function eliminarProducto(id) {
    console.log("eliminar", id);
   let respuesta = await new productoDAO().eliminarProducto(id);
   let productos = await obtenerProductos();
   mostrarProductos(productos);
  
}


function rellenarFormulario(producto) {
    let formElement = document.querySelector("#formularioProducto");
    formElement.nombre.value = producto.nombre;
    formElement.descripcion.value = producto.descripcion;
    formElement.precio.value = producto.precio;
    formElement.oferta.value = producto.oferta;
    formElement.categoria.value = producto.nombreCategoria;
    formElement.stock.value = producto.stock;
    formElement.fecha.value = new Date(producto.fecha).toISOString().split("T")[0];
}

    /*  Modificar   */

    /*document.querySelectorAll(".modificar").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            rellenarFormulario(productos[index]); });
        });*/


    /*  Funcion Modificar   */

/*function rellenarFormulario(producto) {
    let formElement = document.querySelector("#formularioProducto");

    formElement.nombre.value = producto.nombre;
    formElement.descripcion.value = producto.descripcion;
    formElement.precio.value = producto.precio;
    formElement.oferta.value = producto.oferta;
    formElement.categoria.value = producto.categoria;
    formElement.stock.value = producto.stock;
}*/

    
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
        let fecha = formElement.fecha.value;
        console.log(formElement.accion);

        let accion = e.submitter.value; 
        if(accion == "Agregar"){
            agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock);
        }else{
            if(idSelected != null){
            modicarProducto(nombre, descripcion, precio, categoria, oferta, fecha, stock,idSelected);
            }
        }
      
       // 
    }

}

async function modicarProducto(nombre, descripcion, precio, categoria, oferta, fecha, stock,idSelected) {
    let respuesta = await new productoDAO().modicarProducto(nombre, descripcion, precio, categoria, oferta, fecha, stock,idSelected);
    let productos = await obtenerProductos();
    mostrarProductos(productos);
    
}

async function agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock) {
    let respuesta = await new productoDAO().agregarProducto(nombre, descripcion, precio, categoria, oferta, imagen, stock);    
    let productos = await obtenerProductos();
    mostrarProductos(productos);
  
}



/*function agregarEventoFiltro() { document.querySelector("#filtroSelect").addEventListener("change", function() { filtrarProductos(this.value); }); }

function filtrarProductos(filtro) {
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

    mostrarProductos(productosFiltrados);
}*/
