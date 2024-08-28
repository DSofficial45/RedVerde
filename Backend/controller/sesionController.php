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
      //  $resultado = (new SesionModel())->verUsuarioModelo();
       // echo json_encode($resultado);
    }
    
    function registrarUsuario(){
        $nombre = $_POST['nombre'];
        $contraseña = $_POST['contraseña'];
      //  $resultado = (new SesionModel())->registrarUsuarioModelo($nombre, $contraseña);
       // echo json_encode($resultado);
    }

    function iniciarSesion(){
        $nombre = $_POST['nombre'];
        $contraseña = $_POST['contraseña'];
        $resultado = (new SesionModel())->iniciarSesion($nombre, $contraseña);
        echo json_encode($resultado);
    }
    
    function cerrarSesion(){
        $id = $_POST['id'];
       // $resultado = (new SesionModel())->cerrarSesionModelo($id);
       // echo json_encode($resultado);
    }

   

   
?>