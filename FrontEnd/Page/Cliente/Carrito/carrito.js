import carritoDAo from "../../../dao/carritoDAO.js";

window.onload = () => {
    let productos = obtenerProductos();
    //agregarevento();
    mostrarProductos(productos);
    agregarEventoConfirmarCompra();  // Agrega el evento para confirmar la compra
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
        btnEliminar.innerHTML = "<img src='../../../assets/Iconos/eliminar.png' width='20px' height='20px' class='imgEliminar'>";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);  // Pasar producto.id aquí
        };
        btnEliminar.classList.add("eliminar");
        divAcciones.appendChild(btnEliminar);

        // Botón aumentar
        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "+";
        btnAumentar.onclick = () => {
            aumentar(producto.id);  // Pasar producto.id aquí
        };
        btnAumentar.classList.add("aumentar");
        divAcciones.appendChild(btnAumentar);

        // Botón disminuir
        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "-";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);  // Pasar producto.id aquí
        };
        btnDisminuir.classList.add("disminuir");
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
    obtenerProductos();
}

// Función para aumentar la cantidad de un producto
function aumentar(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.aumentarCantidadCarrito(id);  // Pasamos solo el id aquí

    // Recargar los productos después de la actualización
    mostrarProductos(carritoDAO.obtenerCarrito());
    obtenerProductos();
}

// Función para disminuir la cantidad de un producto
function disminuir(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.disminuirCantidadCarrito(id);  // Pasamos solo el id aquí

    // Recargar los productos después de la actualización
    mostrarProductos(carritoDAO.obtenerCarrito());
    obtenerProductos();
}

// Función que agrega el evento de "Confirmar Compra" al botón
function agregarEventoConfirmarCompra() {
  const formularioCompra = document.getElementById("formularioCompra");

  formularioCompra.onsubmit = async (e) => {
      e.preventDefault();  // Evitar que el formulario se envíe de la forma tradicional
      
      // Obtener los valores del formulario
      let nombreCompleto = formularioCompra.nombreCompleto.value.trim();
      let ciudad = formularioCompra.ciudad.value.trim();
      let numeroDeTelefono = formularioCompra.numeroDeTelefono.value.trim();
      let email = formularioCompra.email.value.trim();
      let metodoEnvio = formularioCompra.metodoEnvio.value;
      let direccion = formularioCompra.direccion.value.trim();
      let metodoPago = formularioCompra.metodoPago.value;

      // Validaciones de los campos
      if (!nombreCompleto || !ciudad || !numeroDeTelefono || !email || !metodoEnvio || !metodoPago) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
      }

      // Validar si el método de envío requiere dirección
      if (metodoEnvio === "direccion" && !direccion) {
          alert("Por favor, ingresa tu dirección.");
          return;
      }

      // Confirmar la compra (pasar los datos al backend)
      let CarritoDAO = new carritoDAo(); // Usamos carritoDAo con la 'o' minúscula
      
      // Obtener el carrito de compras (usualmente lo guardas en localStorage)
      obtenerProductos();

      // Preparar los datos a enviar
      let datosCompra = {
          nombreCompleto,
          ciudad,
          numeroDeTelefono,
          email,
          metodoEnvio,
          direccion,
          metodoPago,
          productos: carrito.map(producto => ({
              id: producto.id,
              nombre: producto.nombre,
              cantidad: producto.stock,
              precio: producto.precio
          }))
      };

      // Llamar al método de confirmarCompra con los datos
      let respuesta = await CarritoDAO.confirmarCompra(datosCompra);

      // Manejar la respuesta del servidor
      if (respuesta.estado) {
          alert("Compra realizada con éxito");
          localStorage.removeItem('carrito');  // Limpiar el carrito
          window.location.href = "../Productos/Productos.html";  // Redirigir a la página de productos
      } else {
          alert("Error al confirmar la compra. Inténtalo nuevamente.");
      }
  };
}