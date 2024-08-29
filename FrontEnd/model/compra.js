export default class Compra{
    id;
    fecha;
    precio;
    stock;
    descripcion;
    nombre;

    constructor(id,fecha,precio,stock,descripcion,nombre){
        this.id=id;
        this.fecha=fecha;
        this.precio=precio;
        this.stock=stock;
        this.descripcion=descripcion;
        this.nombre=nombre;

    }

}