import { Component } from '@angular/core';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { initializeApp } from '@angular/fire/app';
import { DatabaseService } from './services/database.service';



interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}



interface Usuarios {
  name: string,
  nickname:string,
  telefono: string,
  email:string,
  password:string,
  uid:string,
  foto:string,
  rol:string,
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  admin='';
  uid= '';
  rol=''

  
  usuario:Usuarios = { 
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
    rol:'',
  };

  constructor(
    private platform:Platform,
    private menuCtrl:MenuController,
    private AuthService:AuthService,
    private firestore: DatabaseService,
    private toastCtrl:ToastController) {

      this.AuthService.stateAuth().subscribe(res=>{
        if(res!==null){
          this.uid=res.uid;
          this.getUserInfo(this.uid)
        }
      });

      console.log(this.uid)
      console.log ()


      this.initializeApp(this.AuthService.uid)
       }

  componentes: Componente [] = [
    {
      icon: 'compass-outline',
      name: 'Destinos',
      redirectTo: '/servicios'
    },
   
    {
      icon: 'cash-outline',
      name: 'Metodos de pago',
      redirectTo: ''
    },
    {
      icon: 'receipt-outline',
      name: 'Mis Arriendos',
      redirectTo: 'tab-inicial/game'
    },
  ]
 

  initializeApp(uide){
    const uuid=uide
    this.platform.ready().then(()=>{
      this.getUid();
      console.log('test',uuid);
      
      console.log(this.admin)  
    })
  }

  cerrarMenu(){
    this.menuCtrl.close('first')
  }


  logOut(){
    this.AuthService.logOut();
    var msj=' Sesión cerrada Nos vemos';
    this.presentToast(msj);
    this.rol='invitado';
    console.log(this.rol)
    window.location.reload();

  }
  async presentToast(msj:string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }


  getUid(){
    this.AuthService.stateAuth().subscribe(res=>{
      this.uid=res.uid
      console.log('getuid1',res.uid)
      return this.uid
      


      
    });
    
    
  }

  getUserInfo(uid:string){
    const path= 'Usuarios'
    this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
      console.log(res)
      this.rol=res.rol;
      
    });

  }

  reloadCurrentPage() {
    window.location.reload();
   }


   



}
