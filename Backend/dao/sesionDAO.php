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
        if ($fila != null) {
            $respuesta = new Respuesta(true, "Sesion Iniciada", $fila["isAdmin"]);
            $_SESSION['sesion'] = [
                "usuario" => [
                    "email" => $fila["email"],
                    "nombre" => $fila["nombre"],
                    "apellido" => $fila["apellido"],
                    "telefono" => $fila["telefono"],
                    "isAdmin" => $fila["isAdmin"]
                ]
            ];
        } else {
            $respuesta = new Respuesta(false, "Error al iniciar", null);
            $_SESSION['sesion'] = null;
        }
        return $respuesta;
    }

    function obtenerSesion(){
        session_start();
        $respuesta = new Respuesta(true, "Sesión Iniciada", null);
        if (isset($_SESSION['sesion']) && $_SESSION['sesion'] !== null) {
            $respuesta = new Respuesta(true, "Sesión obtenida", $_SESSION['sesion']);
        } else {
            $respuesta = new Respuesta(false, "No se ha encontrado una sesión", null);
        }
        return $respuesta;
    }

    function cerrarSesion(){
        session_start();
        $_SESSION['sesion'] = null;
        session_destroy();
        return new Respuesta(true, "Se ha cerrado la sesión correctamente", null);
    }

    public function registrarUsuario($email, $nombre, $apellido, $telefono, $password) {
        try {
            $conection = connection();
            $sql = "INSERT INTO usuario(email, nombre, apellido, telefono, password) 
                    VALUES ('$email', '$nombre', '$apellido', '$telefono', '$password');";
            $respuesta = $conection->query($sql);
            return new Respuesta(true, "Usuario registrado correctamente", $respuesta);
        } catch (Exception $e) {
            return new Respuesta(false, "Error al registrar Usuario: " . $e->getMessage(), null);
        }
    }

    public function verUsuario() {
        $respuesta = new Respuesta(true, "Sesion Iniciada", null);
        if (isset($_SESSION['sesion'])) {
            $respuesta = new Respuesta(true, "Sesion obtenida", $_SESSION['sesion']);
            return $respuesta;
        } else {
            $respuesta = new Respuesta(false, "No se ha encontrado una sesion", null);
            return $respuesta;
        }
    }
}
?>