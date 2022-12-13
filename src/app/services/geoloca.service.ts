import { Injectable } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocaService {
  latitudr: string;

  constructor(private geolocation: Geolocation) { this.latitud()}
  lat: number;
  lng: number;
  lati:string;
  long:string;


  async geolocationNative(){
    await this.geolocation.getCurrentPosition().then((geposition:Geoposition)=>{
      this.lat=geposition.coords.latitude;
      this.lng=geposition.coords.longitude;
      
      this.lati=String(this.lat);
      this.long=String(this.lat);
      console.log(this.lati);
      console.log(this.long);
    })

  }

  latitud(){
    this.geolocation.getCurrentPosition().then((geposition:Geoposition)=>{
      this.lat=geposition.coords.latitude;
      this.lng=geposition.coords.longitude;
      const latit=this.lat=geposition.coords.latitude;
      this.latitudr=String(latit);
      this.long=String(this.lat);
      return this.latitudr
    })


  }
}
