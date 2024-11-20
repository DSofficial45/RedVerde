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
            ofertaTexto = `${producto.oferta}%`; 
        }
        
        let filaHTML = document.createElement("tr");
        filaHTML.innerHTML = `
            <td><img src="${producto.urlImg}" alt="Producto ${producto.nombre}" width="100px" height="100px"
                     onerror="this.onerror=null; this.src='../../../assets/Fondo/PlantaFondo-1.jpg';">
            <td>${producto.nombre}</td>
            <td>${producto.fecha}</td>
            <td>$${producto.precio}</td>
            <td>${ofertaTexto}</td>
            <td>${producto.stock}</td>
            <td class="descripcion">${producto.descripcion}</td>
            <td>${producto.categoria}</td>
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
