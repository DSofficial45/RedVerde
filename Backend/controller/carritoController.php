<?php
    require_once __DIR__ . '/../model/carritoDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "ver":
            verProducto();
        break;

        case "Añadir":
            añadirProducto();
        break;
    
        case "eliminar":
            eliminarProducto();
        break;
        
        case "confirmar":
            confirmarCompra();
        break;

        case "modificar":
            modificarProducto();
        break;
    }

    function verProducto(){
        $resultado = (new productoDAO())->verProductoModelo();
        echo json_encode($resultado);
    }
    
    function añadirProducto(){
        $estado = $_POST['estado'];
        $emailUsuario = $_POST['emailUsuario'];
        $fecha = $_POST['fecha'];
        $resultado = (new productoDAO())->añadirProductoModelo($estado, $emailUsuario, $fecha);
        echo json_encode($resultado);
    }

    function confirmarCompra(){
        $estado = $_POST['estado'];
        $emailUsuario = $_POST['emailUsuario'];
        $fecha = $_POST['fecha'];
        $resultado = (new productoDAO())->confirmarCompraModelo($estado, $emailUsuario, $fecha);
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
        $resultado = (new productoDAO())->modificarProductoModelo($id, $estado, $emailUsuario, $fecha);
        echo json_encode($resultado);
    }
?>