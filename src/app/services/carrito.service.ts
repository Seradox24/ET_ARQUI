import { Injectable } from '@angular/core';
import { Pedido, Productos, Usuarios, ProductoPedido } from '../interfaces/models';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  usuario: Usuarios
  pedido:Pedido;
  path='carrito/';
  uid='';

  Pedido={
    id:this.uid,
      cliente:'',
      productos:[],
      preciototal:null,
      estado:'Reservado',
      fecha: new Date(),
      valoracion:null,
  }
 
  
  constructor(
    public firebaseAuth:AuthService,
    public firestore:DatabaseService,
    public router:Router,
    public modalCtrl: ModalController
    ) { 
    this.firebaseAuth.stateAuth().subscribe(res=>{
      if(res!==null){     
        this.uid=res.uid;
        this.loadUsuario();
         
      }
    });   
  }

  loadCarrito(){
    const path ='Usuarios/'+this.uid+'/'+this.path;
    this.firestore.getDoc<Pedido>(path,this.uid).subscribe(res=>{
      console.log(res);
      if(res){
        this.pedido=res;
      }else{
        this.initCarrito();
      }
    });

  }
  getCarrito(){
    
    return this.pedido
    

  }

  initCarrito(){
    this.pedido={
      id:this.uid,
      cliente:this.usuario,
      productos:[],
      preciototal:null,
      estado:'Reservado',
      fecha: new Date(),
      valoracion:null,

    }
  }

  loadUsuario(){
  const path= 'Usuarios'
  this.firestore.getDoc<Usuarios>(path,this.uid).subscribe(res=>{
    this.usuario=res ;
    console.log(this.usuario)
    this.loadCarrito();
  });
  }


  removeProducto(producto:Productos){

       if(this.uid.length){
              let position=0; 
              const item=this.pedido.productos.find((productoPedido,index)=>{
                position=index;
                return (productoPedido.producto.id===producto.id)
              });
              if(item!==undefined){
                this.pedido.productos.splice(position,1);
              }
          
          console.log('en add pedido->',this.pedido);
          const path ='Usuarios/'+this.uid+'/'+this.path;
          this.firestore.createDoc(this.pedido,path,this.uid).then(()=>{
            console.log('se añadio con exito');
          })
          }

  }

  realizarPedido(){

  }


  addProducto(producto:Productos,hrs:number,valorcrt:number){
  if(this.uid.length){
    const item=this.pedido.productos.find(productoPedido=>{
      return (productoPedido.producto.id===producto.id)
    });
    if(item!==undefined){
      item.cantidad ++;
    }else{
      const add: ProductoPedido ={
        cantidad:hrs,
        producto,
        precio:valorcrt,
      }
      this.pedido.productos.push(add)
    }
}else{

  this.router.navigate(['tab-inicial/perfil-bf']);
  this.modalCtrl.dismiss();

}console.log('en add pedido->',this.pedido);
const path ='Usuarios/'+this.uid+'/'+this.path;
this.firestore.createDoc(this.pedido,path,this.uid).then(()=>{
  console.log('se añadio con exito');
})
}

  clearCarrito(){
    
  }



}
