window.onload = () => {
    agregarEvento();
}

function agregarEvento(){
    let fonElement = document.querySelector();
    formElement.onsubmit = (e)=>{
        e.proventDefault();
        let email = formElement.nombre.value;
        let password = formElement.password.value;

        iniciarSesion(email, password);
    }
}

async function login(nombre,password) {
    let respuesta = await new SesionDAO().iniciarSesion(email,password){
    if(respuesta.es){
        
    }
    }
    
}