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

        // Productos en oferta
        if (producto.oferta > 0) {
            let divOferta = document.createElement("div");
            divOferta.className = "producto";

            divOferta.innerHTML = `
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px"
                     onerror="this.onerror=null; this.src='../../../assets/Fondo/Error404.png';">
                <p>${producto.nombre}</p>
                <p> Precio: $${precioConDescuento} </p>
                <p class="comparativaPrecio">
                    <span class="original">$${producto.precio}</span>
                    <span class="offPorcen">-${producto.oferta}%</span>
                </p>
                <p>Stock: ${producto.stock}</p>
            `;

            // Evento para redirigir al detalle al hacer clic en la imagen
            let img = divOferta.querySelector("img");
            img.style.cursor = "pointer";
            img.onclick = () => {
                window.location.href = `../VisualizacionProducto/VisualProducto.html?id=${producto.id}`;
            };

            // Botón "Agregar al carrito"
            let btnAgregar = document.createElement("button");
            btnAgregar.innerHTML = "Agregar al carrito";
            btnAgregar.className = "botonAccion";
            btnAgregar.onclick = () => {
                agregarProductoCarrito(producto);
            };
            divOferta.appendChild(btnAgregar);

            contenedorOfertas.appendChild(divOferta);
        }

        // Productos generales
        let div = document.createElement("div");
        div.className = "producto";

        div.innerHTML = `
            <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px"
                 onerror="this.onerror=null; this.src='../../../assets/Fondo/Error404.png';">
            <p>${producto.nombre}</p>
            <p> Precio: $${producto.precio} </p>
            <p>Stock: ${producto.stock}</p>
        `;

        // Evento para redirigir al detalle al hacer clic en la imagen
        let img = div.querySelector("img");
        img.style.cursor = "pointer";
        img.onclick = () => {
            window.location.href = `../VisualizacionProducto/VisualProducto.html?id=${producto.id}`;
        };

        // Botón "Agregar al carrito"
        let btnAgregar = document.createElement("button");
        btnAgregar.innerHTML = "Agregar al carrito";
        btnAgregar.className = "botonAccion";
        btnAgregar.onclick = () => {
            agregarProductoCarrito(producto);
        };
        div.appendChild(btnAgregar);

        contenedorGeneral.appendChild(div);
    });
}

/*function mostrarProductos(productos) {
    let contenedorGeneral = document.querySelector("#general");
    let contenedorOfertas = document.querySelector("#ofertas");

    contenedorGeneral.innerHTML = "";
    contenedorOfertas.innerHTML = "";

    productos.forEach(producto => {
        let precioConDescuento = producto.precio - (producto.precio * producto.oferta / 100);
        if (producto.oferta > 0) {
            let divOferta = document.createElement("div");
            divOferta.className = "producto";

            divOferta.innerHTML = `
           
                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px"
                     onerror="this.onerror=null; this.src='../../../assets/Fondo/Error404.png';">
                <p>${producto.nombre}</p>
                <p> Precio: $${precioConDescuento} </p>
                <p class="comparativaPrecio">
                    <span class="original">$${producto.precio}</span>
                    <span class="offPorcen">-${producto.oferta}%</span>
                </p>
                <p>Stock: ${producto.stock}</p>
          `;

           let btnAgregar = document.createElement("button");
           divOferta.appendChild(btnAgregar);
         
           btnAgregar.innerHTML="Agregar al carrito";
           btnAgregar.className="botonAccion";

           btnAgregar.onclick = ()=>{
            agregarProductoCarrito(producto);
           }    
            contenedorOfertas.appendChild(divOferta); 
        } 
            let div = document.createElement("div");
            div.className = "producto";

            div.innerHTML = `

                <img src="${producto.urlImg}" alt="Producto" width="100px" height="100px"
                     onerror="this.onerror=null; this.src='../../../assets/Fondo/Error404.png';">
                <p>${producto.nombre}</p>
                <p> Precio: $${precioConDescuento} </p>
                <p>Stock: ${producto.stock}</p>
            `;
            let btnAgregar = document.createElement("button");
            div.appendChild(btnAgregar);
          
            btnAgregar.innerHTML="Agregar al carrito";
            btnAgregar.className="botonAccion";
 
            btnAgregar.onclick = ()=>{
             agregarProductoCarrito(producto);
            }   
              contenedorGeneral.appendChild(div);
        
    });*/

function agregarProductoCarrito(producto) {
    producto.stockReal = producto.stock;
    producto.stock = 1;
    console.log("Agregando producto", producto);
    let carritoDAO = new CarritoDAo(producto);
    carritoDAO.agregarProductoCarrito(producto); 
}
