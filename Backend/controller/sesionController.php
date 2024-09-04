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
    function verUsuario(){
        $resultado = (new SesionDAO())->verUsuarioModel();
        echo json_encode($resultado);
    }
    
    function registrarUsuario(){
        $email = $_POST['email'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $telefono = $_POST['telefono'];
        $password = $_POST['password'];
        $isAdmin = $_POST['isAdmin'];
        $resultado = (new SesionDAO())->registrarUsuarioModel($email, $nombre, $apellido, $telefono, $password, $isAdmin);
        echo json_encode($resultado);
    }

    function iniciarSesion(){
        $nombre = $_POST['nombre'];
        $password = $_POST['password'];
        $resultado = (new SesionDAO())->iniciarSesionModel($nombre, $password);
        echo json_encode($resultado);
    }
    
    function cerrarSesion(){
        $id = $_POST['id'];
        $resultado = (new SesionDAO())->cerrarSesionModelo($id);
        echo json_encode($resultado);
    }

?>