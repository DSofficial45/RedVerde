<?php

require_once __DIR__ . '/../conexion/conexion.php';

class productoDAO {

    function obtenerProductoModelo(){
        $connection = connection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $producto = $respuesta->fetch_all(MYSQLI_ASSOC);
        return $producto;
    }

    public function agregarProductoModelo($id, $nombre, $precio, $stock, $descripcion, $tipo){
        $sql = "INSERT INTO producto(id, nombre, precio, stock, descripcion, tipo) VALUES ('$id', '$nombre', '$precio', '$stock', '$descripcion', '$tipo')";
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

    public function modificarProductoModelo($id, $nombre, $precio, $stock, $descripcion, $tipo){
        $sql = "UPDATE libro SET nombre='$nombre', precio='$precio', stock='$stock', descripcion='$descripcion', tipo='$tipo' WHERE id=$id";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

}

?>