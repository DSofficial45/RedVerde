<?php
    require_once __DIR__ . '/../dao/comprasDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "confirmar":
            confirmarCompra();
        break;
    
    }

    function confirmarCompra(){
        // Recibimos los datos de la compra a través de POST
        $nombreCompleto = $_POST['nombreCompleto'];
        $ciudad = $_POST['ciudad'];
        $numeroDeTelefono = $_POST['numeroDeTelefono'];
        $email = $_POST['email'];
        $metodoEnvio = $_POST['metodoEnvio'];
        $direccion = $_POST['direccion'];
        $metodoPago = $_POST['metodoPago'];
        $productos = $_POST['productos']; // Esto debe ser un array de productos

        // Llamamos al método del DAO para guardar la compra
        $resultado = (new comprasDAO())->guardarCompra($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoEnvio, $direccion, $metodoPago, $productos);
        
        // Devolvemos la respuesta en formato JSON
        echo json_encode($resultado);
    }
?>
