<?php
    require_once __DIR__ . '/../dao/carritoDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "ver":
            verProducto();
        break;

        case "Añadir":
            añadirProducto();
        break;
    
        case "eliminar":
            eliminarProducto();
        break;
        
        case "confirmar":
            confirmarCompra();
        break;

        case "modificar":
            modificarCantidadProducto();
        break;
    }

    function verProducto(){
        $resultado = (new carritoDAO())->verProductoModelo();
        echo json_encode($resultado);
    }
    
    function añadirProducto(){
        $resultado = (new carritoDAO())->añadirProductoModelo();
        echo json_encode($resultado);
    }

    function confirmarCompra(){
        $resultado = (new carritoDAO())->confirmarCompraModelo();
        echo json_encode($resultado);
    }
    
    function eliminarProducto(){
        $resultado = (new carritoDAO())->eliminarProductoModelo();
        echo json_encode($resultado);
    }
    
    function modificarCantidadProducto(){
        $resultado = (new carritoDAO())->modificarProductoModelo();
        echo json_encode($resultado);
    }
?>