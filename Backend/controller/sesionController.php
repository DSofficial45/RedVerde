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
        
        case "ver":
            verUsuario();
        break;
    }

    function obtenerSesion(){
        $resultado = (new SesionDAO())->obtenerSesion();
        echo json_encode($resultado);
    }

    function verUsuario(){
        //$resultado = (new SesionDAO())->verUsuario();
        //echo $resultado;
    }
    
    function registrarUsuario(){
        $email = $_POST['email'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $telefono = $_POST['telefono'];
        $password = $_POST['password'];
        $isAdmin = $_POST['isAdmin'];
        $resultado = (new SesionDAO())->registrarUsuario(email: $email, nombre: $nombre, apellido: $apellido, telefono: $telefono, password: $password, isAdmin: $isAdmin);
        echo json_encode($resultado);
    }

    function iniciarSesion(){
        $nombre = $_POST['nombre'];
        $password = $_POST['password'];
        $resultado = (new SesionDAO())->iniciarSesion($nombre, $password);
        echo json_encode($resultado);
    }
    
    function cerrarSesion(){
        $email = $_POST['id'];
        $resultado = (new SesionDAO())->cerrarSesion($email);
        echo json_encode($resultado);
    }

?>