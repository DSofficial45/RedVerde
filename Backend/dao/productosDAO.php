<?php

require_once __DIR__ . '/../conexion/conexion.php';

class productoDAO {

    function verProducto(){
        $connection = connection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $producto = $respuesta->fetch_all(MYSQLI_ASSOC);
        
        return new Respuesta(true,"productos obtenidos",$producto);
    }

    public function agregarProducto($nombre, $fecha, $precio, $stock, $descripcion, $urlImg){
        $sql = "INSERT INTO producto(nombre, fecha, precio, stock, descripcion, urlImg) VALUES ('$nombre', '$fecha', '$precio', '$stock', '$descripcion', '$urlImg')";
        $connection = connection();
        try{
            $respuesta = $connection->query($sql);
            return new Respuesta(true,"producto agregado correctamente",null);
            
        }catch(Exception $e){
            return new Respuesta(false,"error al agregar producto",null);
        }
        
        
    }

    public function eliminarProducto($id){
        $sql = "DELETE FROM producto WHERE id ='$id'";
        $connection = connection();
        try{
            $respuesta = $connection->query($sql);
            return new Respuesta(true,"producto eliminado correctamente",null);
        }catch(Exception $e){
            return new Respuesta(false,"error al eliminado producto",null);
        }

    }

    public function modificarProducto($id, $nombre, $fecha, $precio, $stock, $descripcion, $urlImg){
        $sql = "UPDATE libro SET nombre='$nombre', fecha='$fecha', precio='$precio', stock='$stock', descripcion='$descripcion', urlImg=', $urlImg' WHERE id=$id";
        $connection = connection();
        try{
            $respuesta = $connection->query($sql);
            return new Respuesta(true,"producto modificado correctamente",null);
        }catch(Exception $e){
            return new Respuesta(false,"error al modificado producto",null);
        }
    }

}

?>