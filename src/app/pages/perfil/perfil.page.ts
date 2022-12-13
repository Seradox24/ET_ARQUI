import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AuthService } from '../../services/auth.service';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { FirebaseStorage } from '@firebase/storage';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Router, RouterLink } from '@angular/router';


interface Usuarios {
  name: string,
  nickname:string,
  telefono: string,
  email:string,
  password:string,
  uid:string,
  foto:string,
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid= '';
  correo='';
  password='';

  usuario:Usuarios = { 
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    foto:'',
  };

  newFile:any;

  constructor(
    private authService: AuthService,
    private firestore: DatabaseService,
    private toastCtrl: ToastController,
    private Storage:FirestorageService,
    private router: Router,) { 

    this.authService.stateAuth().subscribe(res=>{
      if(res!==null){
        this.uid=res.uid;
        this.getUserInfo(this.uid)
      }
    });

   
  }

  ngOnInit() {
    console.log(this.correo)

  }

  getUserInfo(uid:string){
    const path= 'Usuarios'
    this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
      this.usuario=res ;
    });

  }


  async ModificarSubmit(){
    console.log('submit');
    console.log(this.usuario);
    const {email,password}= this.usuario;
    this.usuario.uid= await this.authService.getUid();
    this.guardarUser();
    var msj='Guardado Correctamente '
    this.presentToast(msj)
    this.authService.updateinfo(this.usuario.nickname);
  }
  
  
  
  
  async guardarUser(){
    const path = 'Usuarios';
    const name = this.usuario.name
    if(this.newFile!== undefined){
      const res= await this.Storage.uploadImage(this.newFile,path,name);
      this.usuario.foto= res
    }
    this.firestore.updateDoc(this.usuario,path,this.usuario.uid).then(res=>{
      console.log('guardado con exito')
    })
  }


  async presentToast(msj:string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000
    });
    toast.present();
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


  logOut(){
    this.authService.logOut();
    var msj=' Sesión cerrada Nos vemos';
    this.presentToast(msj);
    window.location.reload();
    this.router.navigateByUrl('/tab-inicial/home');
    
    
    

  }


}
