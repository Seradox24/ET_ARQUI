import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Pedido, ProductoPedido, Productos, Usuarios } from '../../interfaces/models';
import { DatabaseService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  path='carrito/';
  uid='';
  usuario: Usuarios
  estado:boolean;
  total=0

  productos:Pedido[]=[];

  pedido:Pedido;


  Pedido={
    id:this.uid,
      cliente:'',
      productos:[],
      preciototal:null,
      estado:'Reservado',
      fecha: new Date(),
      valoracion:null,
  }











  //@Input() producto:ProductoPedido
  constructor(public carrito:CarritoService,
              public firestore:DatabaseService,
              public firebaseAuth:AuthService,
              public alertController: AlertController,) { 

                this.firebaseAuth.stateAuth().subscribe(res=>{
                  if(res!==null){     
                    this.uid=res.uid;
                    this.loadUsuario();
                     
                  }
                });
   
    this.loadProduct()
    
  }

  ngOnInit() {
    
  }

  loadProduct(){
    const path ='Usuarios/'+this.uid+'/'+this.path;
    this.firestore.getCollection<Pedido>(this.path).subscribe(res=>{
      console.log(res)
      this.productos=res;
    })
  }

  loadUsuario(){
    const path= 'Usuarios'
    this.firestore.getDoc<Usuarios>(path,this.uid).subscribe(res=>{
      this.usuario=res ;
      console.log(this.usuario)
      this.loadCarrito();
    });
    }

    
  loadCarrito(){
    const path ='Usuarios/'+this.uid+'/'+this.path;
    this.firestore.getDoc<Pedido>(path,this.uid).subscribe(res=>{
      console.log(res);
      if(res){
        this.pedido=res;
        this.estado=true
      }else{
        this.initCarrito();
      }
    });

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


    

 
    
    
    
  
  async deleteProduct(producto:Productos){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmación',
      message: '¿está seguro que desea eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'aceptar',
          handler: () => {
             const path ='Usuarios/'+this.uid+'/'+this.path;
             this.firestore.deleteDoc(path,this.uid)
             this.estado=false


        







          }
        }
      ]
    });

    await alert.present();
  }
    

  
  



  async presentAlert(producto:Productos) {
    const alert = await this.alertController.create({
      header: 'Porfavor ingrese los datos de su tarjeta de credito',
      buttons: [

        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {

              
              
          
            

            this.del(producto)
            console.log('Cancelado');
          }
        }





      ],
      inputs: [
        {
          placeholder: 'Numero de tarjeta',
        },
        {
          placeholder: 'Fecha de tarjeta',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'CVV',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'Algun comentario ?',
        },
      ],
    });

    await alert.present();
  }

  async dummy(producto:Productos){



    this.presentAlert(producto)
    //await this.del(producto)

    
  }


del(producto:Productos){
  const path ='Usuarios/'+this.uid+'/'+this.path;
             this.firestore.deleteDoc(path,this.uid)
             this.estado=false
}





  
}


