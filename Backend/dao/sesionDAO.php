<?php

require_once __DIR__ . '/../conexion/conexion.php';


    session_start();

    class SesionDAO{
        public $nombre;
        public $password;
        

        public function iniciarSesion($nombre, $password){
            
            $conection = conection();
            $sql = "SELECT * FOR usuario WHERE nombre = 'nombre' AND password = 'password'"
            $respuesta = $conection->query($sql);
            $fila = $respuesta->fetch_all();
            if ($fila l=null)(

            )else(
                $respuesta = new Respuesta(true;"Sesion Iniciada", null);
                $_SESSION['sesion']=["usuario"=>$fila];
            )

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