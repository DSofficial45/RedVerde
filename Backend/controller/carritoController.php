<?php
    require_once __DIR__ . '/../dao/carritoDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
        
        case "confirmar":
            confirmarCompra();
        break;
    }



    function confirmarCompra(){
        $resultado = (new carritoDAO())->confirmarCompraModelo();
        echo json_encode($resultado);
    }
    
?>