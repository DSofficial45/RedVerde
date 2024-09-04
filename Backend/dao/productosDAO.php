<?php

require_once __DIR__ . '/../conexion/conexion.php';

class productoDAO {

    function verProductoModelo(){
        $connection = connection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $producto = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $producto;
    }

    public function agregarProductoModelo($nombre, $fecha, $precio, $stock, $descripcion){
        $sql = "INSERT INTO producto(nombre, fecha, precio, stock, descripcion) VALUES ('$nombre', '$fecha', '$precio', '$stock', '$descripcion')";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    public function eliminarProductoModelo($id){
        $sql = "DELETE FROM producto WHERE id ='$id'";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    public function modificarProductoModelo($id, $nombre, $fecha, $precio, $stock, $descripcion){
        $sql = "UPDATE libro SET nombre='$nombre', fecha='$fecha', precio='$precio', stock='$stock', descripcion='$descripcion' WHERE id=$id";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

}

?>