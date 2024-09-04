window.onload = () => {
    agregarEvento();
}

function agregarEvento(){
    let formElement = document.querySelector();
    formElement.onsubmit = (e)=>{
        e.proventDefault();
        let email = formElement.nombre.value;
        let password = formElement.password.value;

        iniciarSesion(email, password);
    }
}

async function iniciarSesion(nombre,password){
    let respuesta = await new SesionDAO().iniciarSesion(nombre,password);
    if(respuesta.estado){
        let respuesta = await new SesionDAO().iniciarSesion(nombre,password);
        console.log(respuesta);
    }else{
        alert(respuesta.mensaje);
    }
    
}