import carritoDAo from "../../../dao/carritoDAO.js";

window.onload = () => {
    let productos = obtenerProductos();
    mostrarProductos(productos);
};

function obtenerProductos() {
    let carritoDAO = new carritoDAo(); 
    let carrito = carritoDAO.obtenerCarrito();
    console.log("Carrito desde obtenido desde el LocalStorage:", carrito);
    return carrito;
}

// Función para mostrar los productos en el carrito

function mostrarProductos(productos) {
    let tbodycarrito = document.querySelector("#tbodyCarrito");

    if (!tbodycarrito) return;  // Verificación de existencia del tbody

    tbodycarrito.innerHTML = "";  // Limpiar tabla antes de mostrar nuevos productos

    let totalPrecio = 0;  // Variable para acumular el precio total

    productos.forEach(producto => {
        let tr = document.createElement("tr");

        // Imagen del producto
        let img = document.createElement("img");
        img.src = producto.urlImg;
        img.alt = "Imagen del producto";
        img.style.width = "100px"; // Estilo opcional

        let tdImagen = document.createElement("td");
        tdImagen.appendChild(img);
        tr.appendChild(tdImagen);

        // Nombre
        let tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;
        tr.appendChild(tdNombre);

        // Total (precio * cantidad)
        let tdTotal = document.createElement("td");

        // Verificar si hay una oferta
        let precioConDescuento = producto.precio;
        if (producto.oferta) {
            precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        }

        let precioProducto = precioConDescuento * producto.stock;
        tdTotal.textContent = "$" + precioProducto.toFixed(2);
        tr.appendChild(tdTotal);

        // Cantidad
        let tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.stock;
        tr.appendChild(tdCantidad);

        // Celda de acciones
        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");

        // Botón eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);  // Pasar producto.id aquí
        };
        divAcciones.appendChild(btnEliminar);

        // Botón aumentar
        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);  // Pasar producto.id aquí
        };
        divAcciones.appendChild(btnAumentar);

        // Botón disminuir
        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);  // Pasar producto.id aquí
        };
        divAcciones.appendChild(btnDisminuir);

        tdAcciones.appendChild(divAcciones);
        tr.appendChild(tdAcciones);

        // Añadir la fila a la tabla
        tbodycarrito.appendChild(tr);

        // Acumular el precio total
        totalPrecio += precioProducto;
    });

    // Añadir fila con el total general
    let trTotal = document.createElement("tr");
    let tdVacio1 = document.createElement("td");
    tdVacio1.setAttribute("colspan", "4");  // Ocupa 4 columnas
    tdVacio1.textContent = "Precio Total";
    trTotal.appendChild(tdVacio1);

    let tdPrecioTotal = document.createElement("td");
    tdPrecioTotal.textContent = "$" + totalPrecio.toFixed(2);
    trTotal.appendChild(tdPrecioTotal);

    // Añadir la fila de total a la tabla
    tbodycarrito.appendChild(trTotal);
}

/*function mostrarProductos(productos) {
    let tbodycarrito = document.querySelector("#tbodyCarrito");

    if (!tbodycarrito) return;  // Verificación de existencia del tbody

    tbodycarrito.innerHTML = "";  // Limpiar tabla antes de mostrar nuevos productos

    productos.forEach(producto => {
        let tr = document.createElement("tr");

        // Imagen del producto
        let img = document.createElement("img");
        img.src = producto.urlImg;
        img.alt = "Imagen del producto";
        img.style.width = "100px"; // Estilo opcional

        let tdImagen = document.createElement("td");
        tdImagen.appendChild(img);
        tr.appendChild(tdImagen);

        // Nombre
        let tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;
        tr.appendChild(tdNombre);

        // Total (precio * cantidad)
        let tdTotal = document.createElement("td");

        // Verificar si hay una oferta
        let precioConDescuento = producto.precio;
        if (producto.oferta) {
            precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        }

        tdTotal.textContent = "$" + (precioConDescuento * producto.stock).toFixed(2);
        tr.appendChild(tdTotal);

        // Cantidad
        let tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.stock;
        tr.appendChild(tdCantidad);

        // Celda de acciones
        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");

        // Botón eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);  // Pasar producto.id aquí
        };
        divAcciones.appendChild(btnEliminar);

        // Botón aumentar
        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);  // Pasar producto.id aquí
        };
        divAcciones.appendChild(btnAumentar);

        // Botón disminuir
        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);  // Pasar producto.id aquí
        };
        divAcciones.appendChild(btnDisminuir);

        tdAcciones.appendChild(divAcciones);
        tr.appendChild(tdAcciones);

        // Añadir la fila a la tabla
        tbodycarrito.appendChild(tr);
    });
}*/

// Función para eliminar el producto del carrito
function eliminarProducto(id) {
    // Crear una instancia del CarritoDAO y eliminar el producto
    let carritoDAO = new carritoDAo();
    carritoDAO.eliminarProductoCarrito(id);  // Aquí pasamos {id: id} para eliminar el producto

    // Recargar los productos después de la eliminación
    mostrarProductos(carritoDAO.obtenerCarrito());
}

// Función para aumentar la cantidad de un producto
function aumentar(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.aumentarCantidadCarrito(id);  // Pasamos solo el id aquí

    // Recargar los productos después de la actualización
    mostrarProductos(carritoDAO.obtenerCarrito());
}

// Función para disminuir la cantidad de un producto
function disminuir(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.disminuirCantidadCarrito(id);  // Pasamos solo el id aquí

    // Recargar los productos después de la actualización
    mostrarProductos(carritoDAO.obtenerCarrito());
}

/*function mostrarProductos(productos) {
    let tbodycarrito = document.querySelector("#tbodyCarrito");
    if (!tbodycarrito) return;  // Verificación de existencia del tbody
    tbodycarrito.innerHTML = "";

    productos.forEach(producto => {
        let tr = document.createElement("tr");

        // Imagen del producto
        let img = document.createElement("img");
        img.src = producto.urlImg;
        img.alt = "Imagen del producto";
        img.style.width = "100px"; // Estilo opcional
        let tdImagen = document.createElement("td");
        tdImagen.appendChild(img);
        tr.appendChild(tdImagen);

        // Nombre
        let tdPrecio = document.createElement("td");
        tdPrecio.textContent = producto.nombre;
        tr.appendChild(tdPrecio);

        // Total (precio * cantidad)
        let tdTotal = document.createElement("td");

        // Verificar si hay una oferta. Si no existe, se aplica el precio original sin descuento.
        let precioConDescuento = producto.precio;

        if (producto.oferta) {
        precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        }

        // Calcular el total con el precio con descuento y mostrarlo con dos decimales.
        tdTotal.textContent = "$" + (precioConDescuento * producto.stock).toFixed(2);

        tr.appendChild(tdTotal);

        // Cantidad
        let tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.stock;
        tr.appendChild(tdCantidad);

        // Celda de acciones
        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");

        // Botón eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);
        };
        divAcciones.appendChild(btnEliminar);

        // Botón aumentar
        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);
        };
        divAcciones.appendChild(btnAumentar);

        // Botón disminuir
        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);
        };
        divAcciones.appendChild(btnDisminuir);

        tdAcciones.appendChild(divAcciones);
        tr.appendChild(tdAcciones);

        // Añadir la fila a la tabla
        tbodycarrito.appendChild(tr);
    });
}*/

/*function mostrarProductos(productos) {
    let tbodycarrito = document.querySelector("#tbodyCarrito");
    tbodycarrito.innerHTML = "";
    productos.forEach(producto => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.imagen}</td>
            <td>${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>${(producto.precio * producto.cantidad).toFixed(2)}</td>
        `;
        tbodycarrito.appendChild(tr);

        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");
        tdAcciones.appendChild(divAcciones);
        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "Quitar carrito";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);
        };
        divAcciones.appendChild(btnEliminar);

        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "Aumentar cantidad";
        btnAumentar.onclick = () => {
            aumentar(producto.id);
        };
        divAcciones.appendChild(btnAumentar);

        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "Disminuir cantidad";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);
        };
        divAcciones.appendChild(btnDisminuir);

        tr.appendChild(tdAcciones);
    });
}*/

/*function ActualizarProductos(){
let productos = obtenerProductos();
mostrarProductos();
}*/