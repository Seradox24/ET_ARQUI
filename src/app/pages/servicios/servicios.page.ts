import { Component, OnInit } from '@angular/core';


interface Destinos{
  imagen: string;
  titulo: string;
  subtitulo: string;
  
  redirectTo: string;
}

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  destinos: Destinos[] = [ 
    {
      imagen: 'assets/img/destinos/arica.jpg',
      titulo: 'Arica',
      subtitulo: ' Vestigios históricos y cultura ancestral',   
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },
    {
      imagen: 'assets/img/destinos/iquique.jpg',
      titulo: 'Iquique',
      subtitulo: 'Sol, playa, tradición y modernidad',
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },
    {
      imagen: 'assets/img/destinos/rapa.png',
      titulo: 'Rapa Nui',
      subtitulo: 'Una isla que es enigma y fascinación',
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },
    {
      imagen: 'assets/img/destinos/spedro.jpg',
      titulo: 'San Pedro de Atacama',
      subtitulo: 'La capital arqueológica de chile ',
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },  
    {
      imagen: 'assets/img/destinos/valdivia.jpg',
      titulo: 'Valdivia',
      subtitulo: 'Gastronomía, modernidad y naturaleza',
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },
    {
      imagen: 'assets/img/destinos/valpo.jpg',
      titulo: 'Valparaíso',
      subtitulo: 'Todo el encanto de la joya del Pacífico',
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },
    {
      imagen: 'assets/img/destinos/chiloe.jpg',
      titulo: 'Isla de Chiloé',
      subtitulo: 'Naturaleza, patrimonio y gastronomía',
      redirectTo: 'http://localhost:8100/tab-inicial/home',
    },  
  ];

  constructor() { }

  ngOnInit() {
  }

}
