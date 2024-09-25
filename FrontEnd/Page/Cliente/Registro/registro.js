window.onload= async()=>{
    let usuarios = await obtenerUsario();
    mostrarUsarios(usuarios);
  }
 
  async function GuardarUsuario(usuario){
    let dataUsuario = new FormData();
    dataUsuario.append('email', usuario.email)
    dataUsuario.append('nombre', usuario.nombre)
    dataUsuario.append('apellido', usuario.apellido);
    dataUsuario.append('telefono', usuario.telefono);
    dataUsuario.append('password', usuario.password);
    dataUsuario.append('isAdmin', usuario.isAdmin);
    let url = window.location.origin + "/APIMySQL/BackEnd/Controllers/MercadoController.php?function=Registrar";
    let config = {
        method: 'POST' ,
        body: dataUsuario
    }
    let respuesta = await fetch(url, config);
    let datosRespuesta = await respuesta.json();
    console.log(datosRespuesta);
    if(datosRespuesta){
        alert("Usuario registrado con exito");
    }
    else{
        alert("Error al registrar el usuario");
    }
 }