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

    public function añadirProductoModelo($nombre, $precio, $stock, $descripcion, $tipo){
        $sql = "INSERT INTO producto(id, nombre, precio, stock, descripcion, tipo) VALUES ('$nombre', '$precio', '$stock', '$descripcion', '$tipo')";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

    public function confirmarCompraModelo($id, $estado, $emailUsuario, $fecha){
        $sql = "INSERT INTO producto(id, nombre, precio, stock, descripcion, tipo) VALUES ('$nombre', '$precio', '$stock', '$descripcion', '$tipo')";
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

    public function modificarProductoModelo($id, $estado, $emailUsuario, $fecha){
        $sql = "UPDATE libro SET estado='$estado', emailUsuario='$emailUsuario', fecha='$fecha' WHERE id=$id";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }

}

?>