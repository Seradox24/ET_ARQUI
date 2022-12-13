import { Injectable, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from './database.service';
import { provideAuth } from '@angular/fire/auth';
import { async } from '@firebase/util';


interface Usuarios {
  name: string,
  nickname:string,
  telefono: string,
  email:string,
  password:string,
  uid:string,
  rol:string,
}

//desde aqui v
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {


  usuario:Usuarios = { 
    name: '',
    nickname:'',
    telefono: '',
    email:'',
    password:'',
    uid:'',
    rol:'',
  };

  uid= '';
  nickname='';
  rol='';



  constructor(
    private afauth: AngularFireAuth,
    private toastCtrl:ToastController,
    private firestore: DatabaseService,
    ) { 

    this.getUid();
    console.log(this.uid)
     this.getUserInfoadmin(this.uid)
     console.log(this.rol)
    
    
  }

  async register(email:string,password:string){
    try {
      return await this.afauth.createUserWithEmailAndPassword(email,password);
    } catch (err) {
      console.log("error en login: " ,err);
      return null;
    }
  }

  async login(email:string,password:string){



    
    try {
      return await this.afauth.signInWithEmailAndPassword(email,password).then(async res=>{
        var nommsj= res.user.displayName
        console.log("se logueo correctamente",res.user.displayName);
       var msj ="Bienvenid@ "+nommsj;
      await this.presentToast(msj);
      });

    } catch (err) {
      console.log("catch error");
      var msj='Error vuelva a intentarlo';
      
      return this.presentToast(msj);
    }
  }

  async loginWithGoogle(email:string,password:string){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log("error en login con google: " ,err);
      return null;
    }
  }

  getUserLogged(){
    return this.afauth.authState;

  }

  logOut(){
    this.afauth.signOut();
    
    

  }

  ngOnInit() {
    this.stateAuth();
  }


  async getUid(){
    const user= await this.afauth.currentUser;
    if (user===null){
      return null;
    }else{
      return user.uid
      
    }
  }

  stateAuth(){
    return this.afauth.authState;
  }
  

  //firebase extraer datos de auth a bd

  async getDp(){
    const user= await this.afauth.currentUser;
    if (user===null){
      return null;
    }else{
      return user.displayName
    }
  }
  async getMail(){
    const user= await this.afauth.currentUser;
    if (user===null){
      return null;
    }else{
      return user.email
    }
  }
  async getPnum(){
    const user= await this.afauth.currentUser;
    if (user===null){
      return null;
    }else{
      return user.phoneNumber
    }
  }
  async getIperfil(){
    const user= await this.afauth.currentUser;
    if (user===null){
      return null;
    }else{
      return user.photoURL
    }
  }

  async presentToast(msj:string) {
    const toast = await this.toastCtrl.create({
      message: msj,
      duration: 2000,
      cssClass: 'serCss'
    });
    toast.present();
  }

  

  getUserInfo(uid:string){
    const path= 'Usuarios'
    this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
      this.usuario=res ;
      this.nickname=res.nickname;
    });

  }
  async getUserInfoadmin(uid:string){
    const path= 'Usuarios'
    this.firestore.getDoc<Usuarios>(path,uid).subscribe(res=>{
      this.usuario=res ;
      this.rol=res.rol;
      console.log('rol desde la funcion',res.rol)
    });

  }

  updateinfo(nickname:string){
    this.afauth.currentUser.then(res=>{
      res.updateProfile({displayName:nickname})
      console.log(res)
    })
  }



}
