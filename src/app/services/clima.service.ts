import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { RespuestaClima } from '../interfaces/interfaces';
import { Geolocation } from '@ionic-native/geolocation/ngx';

interface Geo{
  lati:number,
  long:number,
}
@Injectable({
  providedIn: 'root'
})
export class ClimaService implements OnInit {

  posi:Geo ={
    lati: -33.4528512,
    long: -70.6347008,
  }
  latit=0;
  longi=0;

  apikey= environment.apiKeyC

  constructor(private http:HttpClient,private geolocation: Geolocation) {this.getposi(); }


  ngOnInit() {
    this.getposi();
  }
  


  getposi(){ 
    this.geolocation.getCurrentPosition().then((resp) => {
      this.posi.lati = resp.coords.latitude
      this.posi.long = resp.coords.longitude
      console.log(this.posi )
      this.latit= resp.coords.latitude;
      this.longi= resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    }


  async  getTopHeadLines(){
    console.log(this.longi,this.latit)
    try{
      return  this.http.get<RespuestaClima>(`https://api.weatherbit.io/v2.0/current?lang=es&lat=${this.posi.lati}&lon=${this.posi.long}&key=${this.apikey}&include=minutely`);
     
    }catch(e){
      console.log(e)
    } 
    };

    
}


