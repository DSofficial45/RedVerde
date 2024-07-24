<?php
    require_once __DIR__ . '/../model/usuarioDAO.php.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
        case "agregar":
            agregarProducto();
        break;
    }
    
    function agregarUsusario(){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $usuario = $_POST['usuario'];
        $nTarjeta = $_POST['nTarjeta'];
        $direccion = $_POST['direccion'];
        $contraseña = $_POST['contraseña'];
        $resultado = (new usuarioDAO())->agregarUsuarioModelo($id, $nombre, $apellido, $usuario, $nTarjeta, $direccion, $contraseña);
        echo json_encode($resultado);
    }
?>