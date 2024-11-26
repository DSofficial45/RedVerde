import carritoDAo from "../../../dao/carritoDAO.js";

window.onload = () => {
    let productos = obtenerProductos();
    mostrarProductos(productos);
    agregarEventoConfirmarCompra();
};

function obtenerProductos() {
    let carritoDAO = new carritoDAo(); 
    let carrito = carritoDAO.obtenerCarrito();
    console.log("Carrito desde obtenido desde el LocalStorage:", carrito);
    return carrito;
}

function mostrarProductos(productos) {
    let tbodycarrito = document.querySelector("#tbodyCarrito");

    if (!tbodycarrito) return;

    tbodycarrito.innerHTML = "";

    let totalPrecio = 0;

    productos.forEach(producto => {
        let tr = document.createElement("tr");

        let img = document.createElement("img");
        img.src = producto.urlImg;
        img.alt = "Imagen del producto";
        img.style.width = "100px";

        let tdImagen = document.createElement("td");
        tdImagen.appendChild(img);
        tr.appendChild(tdImagen);

        let tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;
        tr.appendChild(tdNombre);

        let tdTotal = document.createElement("td");

        let precioConDescuento = producto.precio;
        if (producto.oferta) {
            precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        }

        let precioProducto = precioConDescuento * producto.stock;
        tdTotal.textContent = "$" + precioProducto.toFixed(2);
        tr.appendChild(tdTotal);

        let tdCantidad = document.createElement("td");
        tdCantidad.textContent = producto.stock;
        tr.appendChild(tdCantidad);

        let tdAcciones = document.createElement("td");
        let divAcciones = document.createElement("div");

        let btnEliminar = document.createElement("button");
        btnEliminar.innerHTML = "<img src='../../../assets/Iconos/eliminar.png' width='20px' height='20px' class='imgEliminar'>";
        btnEliminar.onclick = () => {
            eliminarProducto(producto.id);
        };
        btnEliminar.classList.add("eliminar");
        divAcciones.appendChild(btnEliminar);

        let btnAumentar = document.createElement("button");
        btnAumentar.innerHTML = "+";
        btnAumentar.onclick = () => {
            aumentar(producto.id);
        };
        btnAumentar.classList.add("aumentar");
        divAcciones.appendChild(btnAumentar);

        let btnDisminuir = document.createElement("button");
        btnDisminuir.innerHTML = "-";
        btnDisminuir.onclick = () => {
            disminuir(producto.id);
        };
        btnDisminuir.classList.add("disminuir");
        divAcciones.appendChild(btnDisminuir);

        tdAcciones.appendChild(divAcciones);
        tr.appendChild(tdAcciones);

        tbodycarrito.appendChild(tr);

        totalPrecio += precioProducto;
    });

    let trTotal = document.createElement("tr");
    let tdVacio1 = document.createElement("td");
    tdVacio1.setAttribute("colspan", "4");
    tdVacio1.textContent = "Precio Total";
    trTotal.appendChild(tdVacio1);

    let tdPrecioTotal = document.createElement("td");
    tdPrecioTotal.textContent = "$" + totalPrecio.toFixed(2);
    trTotal.appendChild(tdPrecioTotal);

    tbodycarrito.appendChild(trTotal);
}

function eliminarProducto(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.eliminarProductoCarrito(id);

    mostrarProductos(carritoDAO.obtenerCarrito());
    obtenerProductos();
}

function aumentar(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.aumentarCantidadCarrito(id);

    mostrarProductos(carritoDAO.obtenerCarrito());
    obtenerProductos();
}

function disminuir(id) {
    let carritoDAO = new carritoDAo();
    carritoDAO.disminuirCantidadCarrito(id);

    mostrarProductos(carritoDAO.obtenerCarrito());
    obtenerProductos();
}

function agregarEventoConfirmarCompra() {
  const formularioCompra = document.getElementById("formularioCompra");

  formularioCompra.onsubmit = async (e) => {
      e.preventDefault();
      
      let nombreCompleto = formularioCompra.nombreCompleto.value.trim();
      let ciudad = formularioCompra.ciudad.value.trim();
      let numeroDeTelefono = formularioCompra.numeroDeTelefono.value.trim();
      let email = formularioCompra.email.value.trim();
      let metodoEnvio = formularioCompra.metodoEnvio.value;
      let direccion = formularioCompra.direccion.value.trim();
      let metodoPago = formularioCompra.metodoPago.value;

      if (!nombreCompleto || !ciudad || !numeroDeTelefono || !email || !metodoEnvio || !metodoPago) {
          alert("Por favor, completa todos los campos requeridos.");
          return;
      }

      if (metodoEnvio === "direccion" && !direccion) {
          alert("Por favor, ingresa tu dirección.");
          return;
      }

      let carritoDAO = new carritoDAo(); 
      let carrito = carritoDAO.obtenerCarrito();

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

      let respuesta = await carritoDAO.confirmarCompra(datosCompra);

      if (respuesta.estado) {
          alert("Compra realizada con éxito");
          localStorage.removeItem('carrito');
          window.location.href = "../Productos/Productos.html";
      } else {
          alert("Error al confirmar la compra. Inténtalo nuevamente.");
      }
  };
}
