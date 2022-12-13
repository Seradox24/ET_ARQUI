import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GoogleServicesService {

  

  constructor(private http:HttpClient) { }


  getTopHeadLines(){
    return this.http.get('https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJL68lBEHFYpYRMQkPQDzVdYQ&key=AIzaSyANG0OQXhXaefWH1d3TtA6QDPprr9sjfaA');
    }
}
