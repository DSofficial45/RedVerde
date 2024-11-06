<?php
    require_once __DIR__ . '/../dao/sesionDAO.php';

    $funcion = $_GET['funcion'];
    switch ($funcion) {
        case "login":
            iniciarSesion();
        break;
    
        case "registrar":
            registrarUsuario();
        break;
    
        case "cerrar":
            cerrarSesion();
            break;
    
        case "obtener":
            obtenerSesion();
            break;
    }

    function obtenerSesion(){
        $resultado = (new SesionDAO())->obtenerSesion();
        echo json_encode($resultado);
    }
    
    function registrarUsuario(){
        $email = $_POST['email'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $telefono = $_POST['telefono'];
        $password = $_POST['password'];
        $resultado = (new SesionDAO())->registrarUsuario($email, $nombre, $apellido, $telefono, $password);
        echo json_encode($resultado);
    }

    function iniciarSesion(){
        $email = $_POST['email'];
        $password = $_POST['password'];
        $resultado = (new SesionDAO())->iniciarSesion($email, $password);
        echo json_encode($resultado);
    }
    
    function cerrarSesion(){
        $resultado = (new SesionDAO())->cerrarSesion();
        echo json_encode($resultado);
    }

?>