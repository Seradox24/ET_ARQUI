import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore: AngularFirestore) { }


  // async create(collection,dato){
  // return await this.firestore.collection(collection).add(dato);
  // }

  createDoc(data:any,path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path:string,id:string,){
    const collection=this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();

  }

  getDoc2<tipo>(path:string,id:string){
    const collection=this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path:string,id:string){
    const collection=this.firestore.collection(path);
    return collection.doc(id).delete()
  }

  updateDoc(data:any,path:string,id:string){
    const collection=this.firestore.collection(path);
    return collection.doc(id).update(data);
  }



//productos

  getId(){
    return this.firestore.createId();
}

  getCollection<tipo>(path:string){
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();

  }






}
