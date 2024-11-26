<?php

require_once __DIR__ . '/../conexion/conexion.php';

class comprasDAO {

    // Método para guardar la compra
    public function guardarCompra($nombreCompleto, $ciudad, $numeroDeTelefono, $email, $metodoEnvio, $direccion, $metodoPago, $productos) {
        $connection = connection();

        // Insertar los detalles de la compra en la tabla 'compras'
        $sqlCompra = "INSERT INTO compras (nombreCompleto, ciudad, numeroDeTelefono, email, metodoEnvio, direccion, metodoPago, fechaVenta)
                      VALUES ('$nombreCompleto', '$ciudad', '$numeroDeTelefono', '$email', '$metodoEnvio', '$direccion', '$metodoPago', NOW())";
        
        try {
            // Ejecutamos la consulta para insertar la compra
            $connection->query($sqlCompra);
            $compraId = $connection->insert_id; // Obtenemos el ID de la compra recién insertada

            // Ahora insertamos los productos de la compra en la tabla 'productos_compras'
            $this->guardarProductosCompra($compraId, $productos, $connection);

            return new Respuesta(true, "Compra realizada con éxito", null);
        } catch (Exception $e) {
            return new Respuesta(false, $e->getMessage(), null);
        }
    }

    // Método para guardar los productos de la compra
    private function guardarProductosCompra($compraId, $productos, $connection) {
        // Insertamos cada producto relacionado con la compra
        $sqlProducto = "INSERT INTO productos_compras (compraId, productoId, nombreProducto, cantidad, precio)
                        VALUES (?, ?, ?, ?, ?)";

        // Preparamos la consulta
        $stmt = $connection->prepare($sqlProducto);

        // Insertamos cada producto
        foreach ($productos as $producto) {
            $stmt->bind_param("iisid", $compraId, $producto['id'], $producto['nombre'], $producto['cantidad'], $producto['precio']);
            $stmt->execute();
        }

        // Cerramos la declaración
        $stmt->close();
    }
}

?>
