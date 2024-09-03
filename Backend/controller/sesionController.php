<?php
    require_once __DIR__ . '/../model/sesionModel.php';

    $funcion = $_GET['funcion'];
    switch ($funcion) {
        case "Login":
            iniciarSesion();
        break;
    
        case "Registrar":
            registrarUsuario();
        break;
    
        case "Cerrar":
            cerrarSesion();
            break;
        
        case "Ver":
            verUsuario();
        break;
    }
    function verUsuario(){
        $resultado = (new SesionDAO())->verUsuarioModel();
        echo json_encode($resultado);
    }
    
    function registrarUsuario(){
        $nombre = $_POST['nombre'];
        $contrasena = $_POST['contraseña'];
        $resultado = (new SesionDAO())->registrarUsuarioModel($nombre, $contraseña);
        echo json_encode($resultado);
    }

    function iniciarSesion(){
        $nombre = $_POST['nombre'];
        $contrasena = $_POST['contraseña'];
        $resultado = (new SesionDAO())->iniciarSesionModel($nombre, $contraseña);
        echo json_encode($resultado);
    }
    
    function cerrarSesion(){
        $id = $_POST['id'];
        $resultado = (new SesionDAO())->cerrarSesionModelo($id);
        echo json_encode($resultado);
    }

?>