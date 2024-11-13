<?php
    require_once __DIR__ . '/../dao/productosDAO.php';
    $funcion = $_GET['funcion'];
    switch ($funcion) {
    
        case "agregar":
            agregarProducto($fecha, $precio, $stock, $descripcion, $nombre, $imagen, $categoria);
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
    
    function agregarProducto($fecha, $precio, $stock, $descripcion, $nombre, $imagen, $categoria){
        $fecha = $_POST['fecha'];
        $precio = $_POST['precio'];
        $stock = $_POST['stock'];
        $descripcion = $_POST['descripcion'];
        $nombre = $_POST['nombre'];
<<<<<<< HEAD
        $imagen = $_POST['imagen'];
=======
        $imagen = $_FILES['imagen'];
>>>>>>> ad3d948923bee1dbe077f65b9cd0de8ed78441c6
        $categoria = $_POST['categoria'];
        $resultado = (new productoDAO())->agregarProducto($fecha, $precio, $stock, $descripcion, $nombre, $imagen, $categoria);
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