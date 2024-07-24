<?php
    require_once __DIR__ . '/../model/productoDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
        case "agregar":
            agregarProducto();
        break;
    
        case "eliminar":
            eliminarProducto();
        break;
    
        case "obtener":
            obtenerProducto();
            break;
        
        case "modificar":
            modificarProducto();
        break;
    }

    function obtenerProducto(){
        $resultado = (new productoDAO())->obtenerProductoModelo();
        echo json_encode($resultado);
    }
    
    
    function agregarProducto(){
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $tipo = $_POST['tipo'];
        $resultado = (new productoDAO())->agregarProductoModelo($id, $nombre, $precio, $stock, $descripcion, $tipo);
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