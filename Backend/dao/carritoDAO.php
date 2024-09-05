<?php

require_once __DIR__ . '/../conexion/conexion.php';

class carritoDAO {
  

    function confirmarCompra(){
        $connection = connection();
        $sql = null;
        $respuesta = $connection->query($sql);
        $carrito = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $carrito;
    }


}

?>