import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { FirebaseStorage } from '@firebase/storage';
import { DatabaseService } from '../../services/database.service';
import { finalize } from 'rxjs/operators';
import { FirestorageService } from 'src/app/services/firestorage.service';

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
//desde aqui empieza denuevo
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuarios = {
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
    rol:''
  };

  usuario2:Usuarios = {
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
    rol:''
  };

  uid= '';
  estado: boolean;
  uidUsr: string;

  newFile:any;

  extes:string;

  

  constructor(
    private authService: AuthService,
    private ModalCtrl: ModalController,
    private router: Router,
    private firestore: DatabaseService,
    private toastCtrl: ToastController,
    private Storage:FirestorageService
    ) { }

  async ngOnInit() {
    this.estado=true;
    const uid = await this.authService.getUid();
    

    
  }
  async loginSubmit() {

  

    console.log('submit');
    console.log(this.usuario);
    const {email,password}= this.usuario;
    await this.authService.login(email,password).then(res=>{
     
      this.authService.stateAuth().subscribe(async (res): Promise<void>=>{
        if(res!==null){
          this.uid=res.uid;
          this.getUserInfo(this.uid)
          console.log(res)
        }
      });

      this.router.navigateByUrl('/tab-inicial/home');
      this.ModalCtrl.dismiss();
    
    }).catch(err=>{

      this.router.navigateByUrl('/tab-inicial/perfil-bf');
      
      
       
      this.ModalCtrl.dismiss();
      window.location.reload();

  
    });

    

     

    



   
    
  }

  async submitWithGoogle(){
    
    console.log(this.usuario);
    const {email,password}= this.usuario;
    this.authService.loginWithGoogle(email,password).then(res=>{console.log(
      "se logueo correctamente",res)});
    
    await this.router.navigateByUrl('/tab-inicial/home');
    this.ModalCtrl.dismiss();

    

  }

  cerrarModal(){
    this.ModalCtrl.dismiss();
  }
  


cEstado(ev:any){
  console.log('cEstado()',ev.detail.value);
  const opc = ev.detail.value;
  if (opc === 'Login'){
    this.estado=true;

  }
  else {
    this.estado=false;

  }
}
//registro zone

async registerSubmit() {
  console.log('submit');
  console.log(this.usuario);

  this.usuario.rol='cliente'
  
  const {email,password}= this.usuario;
  await this.authService.register(email,password).then(async res=>{
    
    console.log("se registro correctamente: ",res)
    var msj='Usuario creado con exito Bienvenido '+res.user.displayName
    this.presentToast(msj)
    this.router.navigateByUrl('/tab-inicial/home');
    this.ModalCtrl.dismiss();
    this.usuario.uid= await this.authService.getUid();
    this.guardarUser();
    this.authService.updateinfo(this.usuario.nickname);
  }).catch(err=>{
    var msj='Error vuelva a intentarlo'
    this.presentToast(msj)
    this.router.navigateByUrl('/tab-inicial/perfil-bf');

  })
  
  
}




 async guardarUser(){
  const path = 'Usuarios';
  const name = this.usuario.name

  


  if(this.newFile!== undefined){
    const res= await this.Storage.uploadImage(this.newFile,path,name);
    this.usuario.foto= res
  }



  this.firestore.createDoc(this.usuario,path,this.usuario.uid).then(res=>{
    
  })
  this.authService.register
}




async getuid1(){
  const uid= await this.authService.getUid();
  console.log(uid)

}

async presentToast(msj:string) {
  const toast = await this.toastCtrl.create({
    message: msj,
    duration: 2000
  });
  toast.present();
}



getUserInfo(uid:string){
  const path= 'Usuarios'
  this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
    this.usuario2=res ;
  });

}

async newImagePro(event:any){
  if(event.target.files && event.target.files[0]){
    this.newFile= event.target.files[0];
    const reader = new FileReader();
    reader.onload = ((image)=>{
      this.usuario.foto= image.target.result as string;
    });
    reader.readAsDataURL( event.target.files[0])


 

  }
  }



}
