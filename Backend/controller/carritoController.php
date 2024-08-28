<?php
    require_once __DIR__ . '/../model/productoModel.php';
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
            modificarProducto();
        break;
    }