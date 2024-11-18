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
                <button class="botonAccion">Agregar al carrito</button>
            </div>`;
            contenedorOfertas.innerHTML += productoHTML;
            contenedorGeneral.innerHTML += productoHTML;
        } else {
            productoHTML = `
            <div class="producto">
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px">
                <p>${producto.nombre}</p>
                <p> Precio: $${producto.precio} </p>
                <p>Stock: ${producto.stock}</p>
                <button class="botonAccionNoOff">Agregar al carrito</button>
            </div>`;
            contenedorGeneral.innerHTML += productoHTML;
        }
    });
}