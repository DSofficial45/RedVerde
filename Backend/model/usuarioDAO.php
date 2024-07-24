<?php

require_once __DIR__ . '/../conexion/conexion.php';

class usuarioDAO {

    public function agregarUsuarioModelo($id, $nombre, $apellido, $usuario, $nTarjeta, $direccion, $contraseña){
        $sql = "INSERT INTO producto(id, nombre, apellido, usuario, nTarjeta, direccion, contraseña) VALUES ('$id', '$nombre', '$apellido', '$usuario', '$nTarjeta', '$direccion', '$contraseña')";
        $connection = connection();
        $respuesta = $connection->query($sql);
        return $respuesta;
    }
}

?>