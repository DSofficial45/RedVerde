<?php

require_once __DIR__ . '/../conexion/conexion.php';
require_once __DIR__ . '/../dao/sesionDAO.php';
require_once __DIR__ . '/../dao/respuesta.php';

    

    class SesionDAO{
        public $email;
        public $password;   

        public function iniciarSesion($email, $password){
            session_start();
            $conection = connection();
            $sql = "SELECT * FROM usuario WHERE email = '$email' AND password = '$password'";
            $respuesta = $conection->query($sql);
            $fila = $respuesta->fetch_assoc();
            if ($fila !=null){
                //$_SESSION['sesion']
                $respuesta =  new Respuesta(true, "Sesion Iniciada", $fila["isAdmin"]);
                $_SESSION['sesion']=["usuario"=>$fila];
                //return $respuesta;
                    
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
                $respuesta = new respuesta(false,"No se ha encontrado una sesion",null);
                return $respuesta;

            }
        
        
        }

        public function cerrarSesion(){
            $conection = connection();
            $_SESSION['sesion'] = null;     
            return new Respuesta(false,"Se a cerrado la sesion correctamente", $_SESSION['sesion']);
            
            /*if(isset($_SESSION['sesion'])){
                $respuesta = new respuesta(true,"Usuario cerrado correctamente",$_SESSION['sesion']);
                return $respuesta;
                
            }else{
                $respuesta = new respuesta(false,"No hay usuario",null);
                return $respuesta;

            }*/

        }

        public function registrarUsuario($email, $nombre, $apellido, $telefono, $password) {
            try {
                $conection = connection();
                $sql = "INSERT INTO usuario(email, nombre, apellido, telefono, password) 
                        VALUES ('$email', '$nombre', '$apellido', '$telefono', '$password');";
                $respuesta = $conection->query($sql);
               return new Respuesta(true, "Usuario registrado correctamente", $respuesta);
              // return "usuario A";
            } catch (Exception $e) {
               return new Respuesta(false, "Error al registrar Usuario: " . $e->getMessage(), null);
                //return "error";
            }
            
        }

        public function verUsuario() {

                $respuesta = new respuesta(true,"Sesion Iniciada",null);
                if(isset($_SESSION['sesion'])){
                    $respuesta = new respuesta(true,"Sesion obtenida",$_SESSION['sesion']);
                    return $respuesta;
                    
                }else{
                    $respuesta = new respuesta(false,"No se ha encontrado una sesion",null);
                    return $respuesta;
    
                }
            
    }

}
?>