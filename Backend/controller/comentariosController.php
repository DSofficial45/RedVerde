<?php
    require_once __DIR__ . '/../dao/comentariosDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "comentar":
            comentar();
        break;

        case "responder":
            responderComentario();
        break;
    
        case "eliminar":
            eliminarComenatario();
        break;
        
        case "modificar":
            modificarComentario();
        break;
    }
    
    function comentar(){
        $texto = $_POST['texto'];
        $idProducto = $_POST['idProducto'];
        $emailUsuario = $_POST['emailUsuario'];
        $fecha = $_POST['fecha'];
        $resultado = (new comentarioDAO())->comentarModelo($texto, $idProducto, $emailUsuario, $fecha);
        echo json_encode($resultado);
    }

    function responderComentario(){
        $idComentario = $_POST['idComentario'];
        $texto = $_POST['texto'];
        $idProducto = $_POST['idProducto'];
        $emailUsuario = $_POST['emailUsuario'];
        $fecha = $_POST['fecha'];
        $resultado = (new comentarioDAO())->responderComentarioModelo($idComentario, $texto, $idProducto, $emailUsuario, $fecha);
        echo json_encode($resultado);
    }

    function eliminarComenatario(){
        $idComentario = $_POST['idComentario'];
        $idProducto = $_POST['idProducto'];
        $resultado = (new comentarioDAO())->eliminarComenatarioModelo($idComentario, $idProducto);
        echo json_encode($resultado);
    }
    
    function modificarComentario(){
        $idComentario = $_POST['idComentario'];
        $texto = $_POST['texto'];
        $idProducto = $_POST['idProducto'];
        $emailUsuario = $_POST['emailUsuario'];
        $fecha = $_POST['fecha'];
        $resultado = (new comentarioDAO())->modificarComentarioModelo($idComentario, $texto, $idProducto, $emailUsuario, $fecha);
        echo json_encode($resultado);
    }
?>