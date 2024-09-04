<?php

require_once __DIR__ . '/../conexion/conexion.php';

class carritoDAO {
    function verProductoModelo(){
        $connection = connection();
        $respuesta = $connection->query($sql);
        $carrito = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $carrito;
    }

    function añadirProductoModelo(){
        $connection = connection();
        $respuesta = $connection->query($sql);
        $carrito = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $carrito;
    }

    function confirmarCompraModelo(){
        $connection = connection();
        $respuesta = $connection->query($sql);
        $carrito = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $carrito;
    }

    function eliminarProductoModelo(){
        $connection = connection();
        $respuesta = $connection->query($sql);
        $carrito = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $carrito;
    }

    function modificarProductoModelo(){
        $connection = connection();
        $respuesta = $connection->query($sql);
        $carrito = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $carrito;
    }

}

?>