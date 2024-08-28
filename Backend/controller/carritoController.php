<?php
    require_once __DIR__ . '/../model/productoModel.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "ver":
            obtenerProducto();
        break;

        case "Añadir":
            agregarProducto();
        break;
    
        case "eliminar":
            eliminarProducto();
        break;
        
        case "confirmar":
            obtenerProducto();
        break;

        case "modificar":
            modificarProducto();
        break;
    }