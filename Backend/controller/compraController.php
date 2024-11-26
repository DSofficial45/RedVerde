<?php
    require_once __DIR__ . '/../dao/comprasDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "confirmar":
            confirmarCompra();
        break;
    
    }

    function confirmarCompra(){
        $nombreCompleto = $_POST['nombreCompleto'];
        $ciudad = $_POST['ciudad'];
        $numeroDeTelefono = $_POST['numeroDeTelefono'];
        $email = $_POST['email'];
        $metodoEnvio = $_POST['metodoEnvio'];
        $direccion = $_POST['direccion'];
        $metodoPago = $_POST['metodoPago'];
        $productos = $_POST['productos'];

        $resultado = (new comprasDAO())->guardarCompra($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoEnvio, $direccion, $metodoPago, $productos);
        
        echo json_encode($resultado);
    }
?>

