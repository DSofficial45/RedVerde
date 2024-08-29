<?php

    class Compra{
        public $id;
        public $descuento;
        public $idProducto;
        public $fechaInicio;
        public $fechaFin;

        public function __construct($id,$descuento,$idProducto,$fechaInicio,$fechaFin) {
            $this->id=$id;
            $this->descuento=$descuento;
            $this->idProducto=$idProducto;
            $this->fechaInicio=$fechaInicio;
            $this->fechaFin=$fechaFin;
        }
    }

?>