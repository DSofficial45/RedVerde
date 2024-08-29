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
    
        case "ver":
            verProducto();
            break;
        
        case "modificar":
            modificarProducto();
        break;
    }

    function verProducto(){
        $resultado = (new productoDAO())->verProductoModelo();
        echo json_encode($resultado);
    }
    
    function agregarProducto(){
        $nombre = $_POST['nombre'];
        $fecha = $_POST['fecha'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $resultado = (new productoDAO())->agregarProductoModelo($nombre, $fecha, $precio, $stock, $descripcion);
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
        $fecha = $_POST['fecha'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $resultado = (new productoDAO())->modificarProductoModelo($id, $nombre, $fecha, $precio, $stock, $descripcion);
        echo json_encode($resultado);
    }
?>