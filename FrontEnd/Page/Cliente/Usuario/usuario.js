import SesionDAO from "../../../../Backend/controller/sesionController.php";

function obtenerUsuario(usuario) {
    let datosElement = document.querySelector("#datos");
    datosElement.innerHTML = "";
    console.log(usuario);
    
    usuario.forEach(usuario => {
        datosElement.innerHTML += `
        <div class="contendedor">
            <div id="nombre">
                <a>Nombre: </a> <a>${usuario.nombre}</a>
            </div>
            <div id="apellido">
                <a>Apellido: </a> <a>${usuario.apellido}</a>
            </div>
            <div id="email">
                <a>Email: </a> <a>${usuario.email}</a>
            </div>
            <div id="telefono">
                <a>Telefono: </a> <a>${usuario.telefono}</a>
            </div>
        </div>
    `
    });
}