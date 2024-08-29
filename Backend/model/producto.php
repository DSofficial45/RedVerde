<?php

    class Producto{
        public $id;
        public $fecha;
        public $precio;
        public $stock;
        public $descripcion;
        public $nombre;

        public function __construct($id,$fecha,$precio,$stock,$descripcion,$nombre) {
            $this->id=$id;
            $this->fecha=$fecha;
            $this->precio=$precio;
            $this->stock=$stock;
            $this->descripcion=$descripcion;
            $this->nombre=$nombre;
        }
    }

?>