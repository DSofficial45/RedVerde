<?php
    require_once __DIR__ . '/../dao/TransaccionesDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "comentar":
            cambiarEstadoCompra();
        break;

        case "pendientes":
            verComprasPendientes();
        break;
    
        case "realizadas":
            verComprasRealizadas();
        break;

        
    }