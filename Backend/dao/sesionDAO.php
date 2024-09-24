<?php

require_once __DIR__ . '/../conexion/conexion.php';
require_once __DIR__ . '/../dao/sesionDAO.php';
require_once __DIR__ . '/../dao/respuesta.php';

    session_start();

    class SesionDAO{
        public $nombre;
        public $password;
        

        public function iniciarSesion($nombre, $password){
            $conection = connection();
            $sql = "SELECT * FROM usuario WHERE nombre = 'nombre' AND password = 'password'";
            $respuesta = $conection->query($sql);
            $fila = $respuesta->fetch_assoc();
            if ($fila !=null){
                $respuesta = new Respuesta(estado: true,mensaje: "Sesion Iniciada", datos: null);
                $_SESSION['sesion']=["usuario"=>$fila];
               // return $respuesta;
                    
            }else{
                $respuesta = new Respuesta(estado: false,mensaje: "Error al iniciar", datos: null);
                $_SESSION['sesion']=["usuario"=>$fila];
            }
            return $respuesta;
            
        }

        public function obtenerSesion(){

            $respuesta = new respuesta(true,"Sesion Iniciada",null);
            if(isset($_SESSION['sesion'])){
                $respuesta = new respuesta(true,"Sesion obtenida",$_SESSION['sesion']);
                return $respuesta;
                
            }else{
                $respuesta = new respuesta(true,"No se ha encontrado una sesion",null);
                return $respuesta;

            }
        
        
        }

        public function cerrarSesion(): Respuesta{
            $_SESSION['sesion'] = null;
            $respuesta = new Respuesta(false,"Error al iniciar", null);
            return $respuesta;

        }

        public function registrarUsuario($email, $nombre, $apellido, $telefono, $password, $isAdmin) {
            try {
                $conection = connection();
                $sql = "INSERT INTO usuario(email, nombre, apellido, telefono, password, isAdmin) 
                        VALUES ('$email', '$nombre', '$apellido', '$telefono', '$password', '$isAdmin');";
                $respuesta = $conection->query($sql);
               return new Respuesta(true, "Usuario registrado correctamente", $respuesta);
              // return "usuario A";
            } catch (Exception $e) {
               return new Respuesta(false, "Error al registrar Usuario: " . $e->getMessage(), null);
                //return "error";
            }
            
        }

        public function verUsuario() {
    }

}
?>