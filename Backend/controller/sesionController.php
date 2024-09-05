<?php
    require_once __DIR__ . '/../dao/sesionDAO.php';

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

    function obtenerUsuario(){
        $resultado = (new SesionDAO())->obtenerSesion();
        echo json_decode($resultado);
    }

    function verUsuario(){
        $resultado = (new SesionDAO())->verUsuario();
        echo json_encode($resultado);
    }
    
    function registrarUsuario(){
        $email = $_POST['email'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $telefono = $_POST['telefono'];
        $password = $_POST['password'];
        $isAdmin = $_POST['isAdmin'];
        $resultado = (new SesionDAO())->registrarUsuario($email, $nombre, $apellido, $telefono, $password, $isAdmin);
        echo json_encode($resultado);
    }

    function iniciarSesion(){
        $nombre = $_POST['nombre'];
        $password = $_POST['password'];
        $resultado = (new SesionDAO())->iniciarSesion($nombre, $password);
        echo json_encode($resultado);
    }
    
    function cerrarSesion(){
        $id = $_POST['id'];
        $resultado = (new SesionDAO())->cerrarSesion($id);
        echo json_encode($resultado);
    }

?>