<?php
function connection()
{
    try{
        $host = "localhost";
        $usuario = "";
        $password = "";
        $bd = "red_verde";
        $puerto = 3306;
        $mysqli = new mysqli ($host, $usuario, $password, $bd, $puerto);
        return $mysqli;
    }
    catch (Exception $e){
        echo '-404 NOT FOUND- Exepcion capturada: ', $e->getMessage();
    }
}
    
?>