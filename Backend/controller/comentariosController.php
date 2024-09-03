<?php
    require_once __DIR__ . '/../model/productoModel.php';
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
    
    function verProducto(){
        $resultado = (new productoDAO())->verProductoModelo();
        echo json_encode($resultado);
    }
    
    
    function comentar(){
        $texto = $_POST['texto'];
        $idProducto = $_POST['idProducto'];
        $emailUsuario = $_POST['emailUsuario'];
        $fecha = $_POST['fecha'];
        $resultado = (new productoDAO())->comentarModelo($texto, $idProducto, $emailUsuario, $fecha);
        echo json_encode($resultado);
    }

    function confirmarCompra(){
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $tipo = $_POST['tipo'];
        $resultado = (new productoDAO())->confirmarCompraModelo($nombre, $precio, $stock, $descripcion, $tipo);
        echo json_encode($resultado);
    }
    
    function eliminarProducto(){
        $id = $_POST['id'];
        $resultado = (new productoDAO())->eliminarProductoModelo($id);
        echo json_encode($resultado);
    }
    
    function modificarProducto(){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $tipo = $_POST['tipo'];
        $resultado = (new productoDAO())->modificarProductoModelo($id, $nombre, $precio, $stock, $descripcion, $tipo);
        echo json_encode($resultado);
    }
?>