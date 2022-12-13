import { Component, OnInit,   } from '@angular/core';


interface Producto{
  imagen: string;
  nombre: string;
  cantidad: string;
  precio:string;
  redirectTo: string;
}


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  
})
export class GamePage implements OnInit {

  
  producto: Producto[] = [ 
    {
      imagen: 'assets/img/proyecArqui/test2.jpg',
      nombre: 'Alvarez 2336',
      cantidad: ' 8', 
      precio: ' 7500', 
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    }, 
    {
      imagen: 'assets/img/proyecArqui/esta2.jpg',
      nombre: 'logar 12',
      cantidad: ' 8', 
      precio: ' 2500', 
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },
    {
      imagen: 'assets/img/proyecArqui/esta1.jpg',
      nombre: 'Pj.Arica 14',
      cantidad: ' 8', 
      precio: ' 7500', 
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    }, 
  ];


  

  constructor() { }

  ngOnInit() {
  
  }

}
