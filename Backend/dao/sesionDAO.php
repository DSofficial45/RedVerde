<?php

/*require_once __DIR__ . '/../conexion/conexion.php';

class SesionModel {

    public function iniciarSesion($usuario,$contraseña){
        $respuesta = $this->autentificar($usuario, $contraseña);
        if($respuesta == null){
            return 'datos incorrectos';
        }else{
            $_SESSION['sesion']=[
                "user" => $usuario,
                "tipo" => $respuesta,//nos quedamos acá

            ];

            return "Datos correctos";
        }

    }

    public function autentificar($usuario, $password){
        $sql = "SELECT tipo FROM usuario  WHERE nombre='$usuario' and contraseña= '$password'";
        $connection = connection();
        $respuesta =   $connection->query($sql);
        $dato = $respuesta->fetch_assoc();
        return $dato;
    }
}*/



?>