<?php

class Perfil{
    public $email;
    public $nombre;
    public $apellido;
    public $telefono;
    public $password;
    public $isAdmin;

    public function __construct($email,$nombre,$apellido,$telefono,$password,$isAdmin) {
        $this->email=$email;
        $this->nombre=$nombre;
        $this->apellido=$apellido;
        $this->telefono=$telefono;
        $this->password=$password;
        $this->isAdmin=$isAdmin;
    }
}

?>