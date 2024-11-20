<?php

require_once __DIR__ . '/../conexion/conexion.php';
require_once __DIR__ . '/imagenDAO.php';
require_once __DIR__ . '/../conexion/config.php';

class productoDAO {

    function obtenerProductos(){
        $connection = connection();
        $sql = "SELECT * FROM producto";
        $respuesta = $connection->query($sql);
        $producto = $respuesta->fetch_all(MYSQLI_ASSOC);
        $host = getHost();
        foreach($producto as $key => $value){

            $producto[$key]['urlImg'] = "$host/Backend/imgBack/".$value['id'].".".$value['extension'];
        }
        
        return new Respuesta(true,"productos obtenidos",$producto);
    }

    /*public function agregarProducto($fecha, $precio, $stock, $descripcion, $nombre, $imagen, $categoria, $oferta){

       
        $connection = connection();
        $nomImg = $imagen['name'];
        $extension = pathinfo($nomImg, PATHINFO_EXTENSION);
        $sql = "INSERT INTO producto (fecha, precio, stock, descripcion, nombre, extension, nombreCategoria, oferta) VALUE ('$fecha', $precio, $stock, '$descripcion', '$nombre', '$extension', '$categoria', '$oferta')";
       
        try{
            $connection->query($sql);
            $id= $connection -> insert_id;
            $ruta_temp = $imagen["tmp_name"];
             move_uploaded_file($ruta_temp, "../imgBack/$id.$extension");
            return new Respuesta(true, "Producto agregado correctamente", null);
        }catch(Exception $e){
            return new Respuesta(false, $e->getMessage(), null);
        }
       
    }*/

    public function agregarProducto($fecha, $precio, $stock, $descripcion, $nombre, $imagen, $categoria, $oferta) {
        $connection = connection();
        $nomImg = $imagen['name'];
        $extension = pathinfo($nomImg, PATHINFO_EXTENSION);
        $sql = "INSERT INTO producto (fecha, precio, stock, descripcion, nombre, extension, nombreCategoria, oferta) 
                VALUES ('$fecha', $precio, $stock, '$descripcion', '$nombre', '$extension', '$categoria', '$oferta')";
    
        try {
            $connection->query($sql);
            $id = $connection->insert_id;
            $ruta_temp = $imagen["tmp_name"];
            move_uploaded_file($ruta_temp, "../imgBack/$id.$extension");
            return new Respuesta(true, "Producto agregado correctamente", null);
        } catch (Exception $e) {
            return new Respuesta(false, $e->getMessage(), null);
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

    public function modificarProducto($id, $fecha, $precio, $stock, $descripcion, $nombre, $categoria, $oferta){
        $sql = "UPDATE producto SET fecha='$fecha', precio='$precio', stock='$stock', descripcion='$descripcion', nombreCategoria='$categoria', nombre='$nombre', oferta='$oferta' WHERE id=$id";
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