import carritoDAo from "../../../dao/carritoDAO.js";

window.onload = () => {
    let productos = obtenerProductos();
    //agregarevento();
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

/*function agregarevento() {
    let metodoEnvio = document.querySelector("#metodoEnvio");
    let direccionInput = document.querySelector("#direccion");
    let direccionLabel = document.querySelector("label[for='direccion']"); 
    let confirmarCompraElement = document.querySelector("#realize-order");
  
    metodoEnvio.onchange = () => {
      let valor = metodoEnvio.value;
      if (valor === "local") {
        direccionInput.style.display = "none";
        direccionLabel.style.display = "none"; 
      } else {
        direccionInput.style.display = "block";  
        direccionLabel.style.display = "block";  
      }
    };
  
    confirmarCompraElement.onsubmit = (e) => {
      e.preventDefault();
      let nombreCompleto = confirmarCompraElement.nombreCompleto.value.trim();
      let ciudad = confirmarCompraElement.ciudad.value.trim();
      let numeroDeTelefono = confirmarCompraElement.numerodetelefono.value.trim();
      let email = confirmarCompraElement.email.value.trim();
      let metodoEnvio = confirmarCompraElement.metodoEnvio.value;
      let direccion = confirmarCompraElement.direccion.value.trim();
      let metodoPago = confirmarCompraElement.metodoPago.value;
  
      if (!nombreCompleto || !ciudad || !numeroDeTelefono || !email || !metodoEnvio || !metodoPago) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }
  
      if (metodoEnvio === "direccion" && !direccion) {
        alert("Por favor, ingrese su direccion.");
        return;
      }
  
      confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago);
    };
  }
  
  async function confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago) {
    let carritoDAO = new carritoDAo();
    let respuesta = await carritoDAO.confirmarCompra(nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago);
    
    if (respuesta.estado) {
      alert("Compra realizada con éxito");
      localStorage.removeItem('carrito');
      console.log("carrito")
      window.location.href = "../productos/productos.html";
  } else {
      alert("Error al confirmar la compra. Inténtalo nuevamente.");
  }
  
  }*/