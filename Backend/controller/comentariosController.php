<?php
    require_once __DIR__ . '/../model/productoModel.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "comentar":
            comentar();
        break;

        case "responder":
            responderComentario();
        break;
    
        case "eliminar":
            eliminarComenatario();
        break;
        
        case "modificar":
            modificarComentario();
        break;
    }