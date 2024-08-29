export default class Oferta{
    id;
    descuento;
    idProducto;
    fechaInicio;
    fechaFin;

    constructor(id, descuento, idProducto, fechaInicio, fechaFin){
        this.id=id;
        this.descuento=descuento;
        this.idProducto=idProducto;
        this.fechaInicio=fechaInicio;
        this.fechaFin=fechaFin;

    }

}