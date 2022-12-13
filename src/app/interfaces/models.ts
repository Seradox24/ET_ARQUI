import { NumericValueAccessor } from "@ionic/angular";


export interface Usuarios{
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
    perfil:''
    rol:''
}


export interface Productos{
    nombre:string;
    region:string;
    precio:number;
    tiempo:string;
    personas:string;
    slot?:string;
    resumen:string;
    itinerario:string;
    latitud?:number;
    longitud?:number;
    foto:string;
    id:string;
    uid:string;
    fecha:Date;
    estado:EstadoEstacionamiento;
}

export interface Pedido{
    id:string;
    cliente:Usuarios;
    productos:ProductoPedido [];
    preciototal:number;
    estado:EstadoPedido;
    fecha:Date;
    valoracion:number;

}

export interface ProductoPedido{
    producto:Productos;
    cantidad:number;
    precio:number;
}

export type EstadoPedido = 'Reservando'|'Reservado'|'Ocupando'|'Libre'
export type EstadoEstacionamiento = 'Arrendado'|'Disponible'