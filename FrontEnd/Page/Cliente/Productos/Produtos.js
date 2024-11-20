import productoDAO from "../../../dao/productoDAO.js";
import CarritoDAo from "../../../dao/carritoDAO.js";

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

    contenedorGeneral.innerHTML = "";
    contenedorOfertas.innerHTML = "";

    productos.forEach(producto => {
        let precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        let productoHTML;

        if (producto.oferta > 0) {
            productoHTML = `
            <div class="producto">
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px">
                <p>${producto.nombre}</p>
                <p> Precio: $${precioConDescuento} </p>
                <p class="comparativaPrecio">
                    <span class="original">$${producto.precio}</span>
                    <span class="offPorcen">-${producto.oferta}%</span>
                </p>
                <p>Stock: ${producto.stock}</p>
            </div>`;
            
            contenedorOfertas.innerHTML += productoHTML;
            contenedorGeneral.innerHTML += productoHTML;

            let btn = document.createElement("button");
        btn.classList.add("btn-add");
        btn.textContent = "Agregar";
        btn.onclick = () => {
            agregarProductoCarrito(producto);
        }
        contenedorOfertas.appendChild(btn);

        } else {
            productoHTML = `
            <div class="producto">
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px">
                <p>${producto.nombre}</p>
                <p> Precio: $${producto.precio} </p>
                <p>Stock: ${producto.stock}</p>
            </div>`;
            contenedorGeneral.innerHTML += productoHTML;

        let btn = document.createElement("button");
        btn.classList.add("btn-add");
        btn.textContent = "Agregar";
        btn.onclick = () => {
            agregarProductoCarrito(producto);
        }
        contenedorGeneral.appendChild(btn);
        
        }
    });

    function agregarProductoCarrito(producto) {
        console.log("Agregando producto", producto);
        producto.cantidad = 1;
        let carritoDAO = new CarritoDAo(producto);
        carritoDAO.agregarProductoCarrito(producto); 
    }
}