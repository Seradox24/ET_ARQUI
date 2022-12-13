import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ClimaService } from '../../services/clima.service';
import { Datum, Weather } from '../../interfaces/interfaces';
import { ModalProductoPage } from '../modal-producto/modal-producto.page';
import { DatabaseService } from '../../services/database.service';
import { Productos } from '../../interfaces/models';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage  implements OnInit {
//api clima
  clima: Datum[]=[];
  weather: Weather[]=[];
  map = null;

//------productos
private path ='Productos/'

productos:Productos[]=[];


  constructor(
    private geolocation: Geolocation,
    private loadingCtrl:LoadingController,
    private climaService:ClimaService,
    public modalCtrl: ModalController,
    private firestore:DatabaseService
    ) {
      this.loadProduct();
}

  async ngOnInit() {
    (await this.climaService.getTopHeadLines()).subscribe(res=>{   
      this.clima.push(...res.data);     
      this.weather=this.clima[0].weather;
     
    });    
  }

  async presentModal(
    a1:string,
    a2:string,
    a3:number,
    a4:string,
    a5:string,
    a6:string,
    a7:string,
    a8:string,
    a9:number,
    a10:number,
    a11:string,) {
    console.log(a1,a2)
    const modal = await this.modalCtrl.create({
      component: ModalProductoPage,
      componentProps:{
        nombre:a1,
        region:a2,
        precio:a3,
        tiempo:a4,
        personas:a5,
        slot:a6,
        resumen:a7,
        itinerario:a8,
        latitud:a9,
        longitud:a10,
        foto:a11,
        
        
      }
      
    });
    return await modal.present();
  }


  loadProduct(){
    this.firestore.getCollection<Productos>(this.path).subscribe(res=>{
      console.log(res)
      this.productos=res;
    })
  }











}
