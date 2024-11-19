import productoDAO from "../../../dao/productoDAO.js";

window.onload = async () => {
    let productos = await obtenerProductos();
    mostrarProductos(productos);
}

async function obtenerProductos() {
    let respuesta = await new productoDAO().obtenerProductos();
    return respuesta.datos;
}

function mostrarProductos(productos) {
    let contenedorGeneral = document.querySelector("#general");
    let contenedorOfertas = document.querySelector("#ofertas");

    // Limpiar contenido de ambos contenedores
    contenedorGeneral.innerHTML = "";
    contenedorOfertas.innerHTML = "";

    productos.forEach(producto => {
        let precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        let productoHTML;

        // Producto con oferta
        if (producto.oferta > 0) {
            productoHTML = `
            <div class="producto">
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px"
                <p>${producto.nombre}</p>
                <p> Precio: $${precioConDescuento} </p>
                <p class="comparativaPrecio">
                    <span class="original">$${producto.precio}</span>
                    <span class="offPorcen">-${producto.oferta}%</span>
                </p>
                <p>Stock: ${producto.stock}</p>
                <button class="botonAccion">Agregar al carrito</button>
            </div>`;
            // Agregar el producto a ambas secciones
            contenedorOfertas.innerHTML += productoHTML;
            contenedorGeneral.innerHTML += productoHTML;
        } else {
            // Producto sin oferta
            productoHTML = `
            <div class="producto">
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px"
                     onerror="this.onerror=null; this.src='/ruta/a/imagen/predeterminada.jpg';">
                <p>${producto.nombre}</p>
                <p> Precio: $${producto.precio} </p>
                <p>Stock: ${producto.stock}</p>
                <button class="botonAccion">Agregar al carrito</button>
            </div>`;
            // Agregar el producto solo a la sección general
            contenedorGeneral.innerHTML += productoHTML;
        }
    });
}