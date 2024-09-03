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

    session_start();

    class SesionDAO{
        public $nombre;
        public $password;
        

        public function iniciarSesion($nombre, $password){
            //verificar datos
            //obtener datos

            $sesion = new SesionDAO($nombre, $password);
            $_SESSION['sesion'] = $sesion;
        
        }

        public function obtenerSesion(){
            return $_SESSION['sesion'];
        }

        public function cerrarSesion(){
            $_SESSION['sesion'] = null;
        }

        public function estaLogeado(){
            return isset($_SESSION['sesion']);
        }
    }

?>