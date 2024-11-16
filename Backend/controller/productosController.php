<?php
    require_once __DIR__ . '/../dao/productosDAO.php';
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
        $resultado = (new productoDAO())->obtenerProductos();
        echo json_encode($resultado);
    }
    
    function agregarProducto() {
        $fecha = $_POST['fecha'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $nombre = $_POST['nombre'];
        $imagen = $_FILES['imagen'];
        $categoria = $_POST['categoria'];  
        $oferta = $_POST['oferta'];
        $resultado = (new ProductoDAO())->agregarProducto($fecha, $precio, $stock, $descripcion, $nombre, $imagen, $categoria, $oferta);
        
        echo json_encode($resultado);
    }
    
    
    function eliminarProducto(){
        $id = $_POST['id'];
        $resultado = (new productoDAO())->eliminarProducto($id);
        echo json_encode($resultado);
    }
    
    function modificarProducto(){
        $id = $_POST['id'];
        $fecha = $_POST['fecha'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $nombre = $_POST['nombre'];
        $imagen = $_POST['imagen'];
        $resultado = (new productoDAO())->modificarProducto($id, $fecha, $precio, $stock, $descripcion, $nombre, $imagen);
        echo json_encode($resultado);
    }
?>