import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { Productos } from '../../interfaces/models';
@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss'],
})
export class ModalProductoPage implements OnInit {

  
  
  @Input() nombre:string
  @Input() region:string
  @Input() precio:number
  @Input() tiempo:string
  @Input() personas:string
  @Input() slot:string
  @Input() resumen:string
  @Input() itinerario:string
  @Input() latitud:number
  @Input() longitud:number
  @Input() foto:string
  @Input() producto:Productos
  hrs=0;
  valorcrt=0
  
  
  constructor(
    public modalCtrl: ModalController,
    public carritoServices:CarritoService,
    ) { 
    
  }

  ngOnInit() {
    
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  boton(){
    console.log(this.nombre,this.region)
  }

  plus(){
    const tp=parseInt(this.tiempo)
    console.log(tp)
    if (this.hrs>=0 && this.hrs<tp){
      this.hrs+=1;
      this.valorcrt=this.hrs*this.precio
    }

  }

  minus(){
    if (this.hrs>0){
      this.hrs-=1;
      this.valorcrt=this.hrs*this.precio
    }

  }

  addCarrito(){
    this.carritoServices.addProducto(this.producto,this.hrs,this.valorcrt)
    console.log(this.producto)
    this.cerrarModal()

  }

  

}
