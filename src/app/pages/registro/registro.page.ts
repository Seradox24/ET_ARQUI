import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { Productos } from 'src/app/interfaces/models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestorageService } from '../../services/firestorage.service';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  uid= '';

  newProducto: Productos={
    nombre:'',
    region:'',
    precio:null,
    tiempo:'',
    personas:'',
    slot:'',
    resumen:'',
    itinerario:'',
    latitud:null,
    longitud:null,
    foto:'',
    id:this.firestore.getId(),
    uid:'',
    fecha:new Date(),
    estado:'Disponible',
  };

  productos:Productos[]=[];

  enableNewProduct=false;
  newFile='';


private  path= 'Productos/';

uId= '';
  constructor(
    private firebase: AuthService,
    private firestore: DatabaseService,
    private auft : AngularFireAuth,
    private Storage:FirestorageService,
    public alertController: AlertController,
    private toastCtrl: ToastController,
     ) 
     {

      this.firebase.stateAuth().subscribe(res=>{
        console.log(res.uid)
        if(res!==null){
          this.uid=res.uid;
          console.log(res)
          
         

        }else{
          this.uid='';
          

        }
      })


      }

  async ngOnInit() {
    //get uid para guardar el uid en el producto
    const uid = await this.firebase.getUid();
    console.log(uid)
    this.newProducto.uid= uid
    //
    this.getProductos()
    
  }
  onSubmit() {
     }
  
  async guardarProducto(){

    const path='Productos'
    const name= this.newProducto.nombre;
    
    console.log(this.newFile)
    if(this.newFile!== ''){

    const res= await this.Storage.uploadImage(this.newFile,path,name);
    this.newProducto.foto= res
    console.log(res)
    }
   
  

    const uid = await this.firebase.getUid();
    this.newProducto.uid= uid
    this.firestore.createDoc(this.newProducto,this.path,this.newProducto.id).then(res=>{
      var msj='Guardado correctamente'
      this.presentToast(msj)
    })


  }

  getProductos(){
    this.firestore.getCollection<Productos>(this.path).subscribe(res=>{
      this.productos=res.filter((Evento) => 
      Evento.uid === this.uid);;
    });
  }

  // getProductos2(){
  //   this.firestore.getCollection<Productos>(this.path).subscribe(res=>{
      
  //     this.productos=res;
  //   });
  // }

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
            this.firestore.deleteDoc(this.path,producto.id);
            // var msj='Borrado correctamente';
            // this.presentToast(msj);
          }
        }
      ]
    });

    await alert.present();
  }
    
  

 
  NewItem(){
    this.enableNewProduct=true;
    this.newProducto={
      nombre:'',
      region:'',
      precio:null,
      tiempo:'',
      personas:'',
      slot:'',
      resumen:'',
      itinerario:'',
      latitud:null,
      longitud:null,
      foto:'',
      id:this.firestore.getId(),
      uid:'',
      fecha:new Date(),
      estado:'Disponible',
    };
  }
  newImage=''


  async newImagePro(event:any){
    if(event.target.files && event.target.files[0]){
      this.newFile= event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image)=>{
        this.newProducto.foto= image.target.result as string;
      });
      reader.readAsDataURL( event.target.files[0])
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentToast(msj:string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
 
}
