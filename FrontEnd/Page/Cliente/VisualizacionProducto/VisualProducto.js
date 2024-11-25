import productoDAO from "../../../dao/productoDAO.js";

window.onload = async () => {
    // Obtener el parámetro "id" de la URL
    let params = new URLSearchParams(window.location.search);
    let productId = params.get("id");

    // Validar si el ID está presente
    if (!productId || isNaN(productId)) {
        alert("Producto no encontrado.");
        window.location.href = "../Productos/Productos.html";
        return;
    }

    // Llamar a la función para obtener el producto por su ID
    let producto = await obtenerProductoPorId(productId);

    // Si no se encuentra el producto, redirigir
    if (!producto) {
        alert("Producto no encontrado.");
        window.location.href = "../Productos/Productos.html";
        return;
    }

    // Mostrar los detalles del producto
    mostrarDetalleProducto(producto);
};

// Función para obtener un producto por su ID
async function obtenerProductoPorId(id) {
    // Cargar productos desde el DAO
    let productos = await new productoDAO().obtenerProductos();

    // Validar estructura de datos
    if (!productos || !productos.datos || !Array.isArray(productos.datos)) {
        console.error("Productos no disponibles o estructura inválida.");
        return null;
    }

    // Convertir a String y buscar el producto
    const idBuscado = String(id);
    return productos.datos.find(producto => String(producto.id) === idBuscado);
}

// Función para mostrar los detalles del producto
function mostrarDetalleProducto(producto) {
    let contenedor = document.querySelector("#productoDetalle");

    // Mostrar la información del producto en el contenedor
    contenedor.innerHTML = `
        <img src="${producto.urlImg}" alt="${producto.nombre}" 
             onerror="this.onerror=null; this.src='../../../assets/Fondo/Error404.png';">
        <h1>${producto.nombre}</h1>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <p><strong>Oferta:</strong> -${producto.oferta}%</p>
        <p><strong>Precio con descuento:</strong> $${producto.precio - (producto.precio * producto.oferta / 100)}</p>
        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
        <p><strong>Stock disponible:</strong> ${producto.stock}</p>
        <button id="agregarCarrito">Agregar al carrito</button>
    `;

    // Asignar evento al botón de agregar al carrito
    let btnAgregar = document.querySelector("#agregarCarrito");
    btnAgregar.onclick = () => {
        agregarProductoCarrito(producto);
        alert("Producto agregado al carrito.");
    };
}

// Función para agregar el producto al carrito
function agregarProductoCarrito(producto) {
    producto.stockReal = producto.stock;
    producto.stock = 1;
    let carritoDAO = new CarritoDAO();
    carritoDAO.agregarProductoCarrito(producto);
}
