<?php
    require_once __DIR__ . '/../conexion/conexion.php';
    require_once __DIR__ . '/respuesta.php';

    class ImagenDAO{
        
        function agregarImagen($imagen): Respuesta{
            $nombre = $imagen['name'];
            $ruta = $imagen['tmp_name'];
            $extension = pathinfo($nombre, PATHINFO_EXTENSION);

            $sql = "INSERT INTO imagen(extension) VALUES ('$extension')";
            $connection = connection();
            try{
                $connection->query($sql);
                $id = $connection->insert_id;
                $url = __DIR__ . "../imagenes/$id.$extension";
                move_uploaded_file($ruta, $url);
                return new Respuesta(false, "Imagen agregada correctamente", $id);
            }catch(Exception $e){
                return new Respuesta(false, "Error al agregar la imagen", null);
            }

        }
    }
?>