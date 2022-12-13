import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuController, AlertController } from '@ionic/angular';
import { using } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { Productos } from 'src/app/interfaces/models';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../modal-producto/modal-producto.page';
import { Router } from '@angular/router';

//interfaces
interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
}

interface SlideCard{
  imagen: string;
  titulo: string;
  subtitulo: string;
  texto: string;
  redirectTo: string;
}

interface Slide1{
  imagen: string;
  titulo: string;
  redirectTo: string;
}

interface Destinos{
  imagen: string;
  titulo: string; 
  redirectTo: string;
}
//fin interfaces





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public modalCtrl: ModalController,
    private AuthService: AuthService,
    private menuCtrl:MenuController,
    private firestore:DatabaseService,
    public alertController:AlertController,
    public router: Router) { this.loadProduct()}
  
  uidUsr: string;

  private path ='Productos/'

  productos:Productos[]=[];

  ngOnInit() {
   
  }


  



  getUser(){
    this.AuthService.getUserLogged().subscribe(res=>{
      console.log(res?.displayName)
    })

  }

  async getUid(){
   
      return console.log("else",this.uidUsr)

    
  }
  
  logOut(){
    this.AuthService.logOut();

  }

  async gps(){
    const alert = await this.alertController.create({
      header: 'Activar GPS ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['servicios']);
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
           
          },
        },
      ],
    });

    await alert.present();

    
  }
  

 

  mostrarMenu(){
    this.menuCtrl.open('first')
  }
  cerrarMenu(){
    this.menuCtrl.close('first')
  }



//slides y otros 
cardslide: SlideCard[] = [ 
  {
    imagen: 'assets/img/slide/slide13.svg',
    titulo: 'Comienza tu aventura',
    subtitulo: ' ',
    texto: 'Planea tu viaje y decide tu destino con la ayuda de TravelGo',
    redirectTo: '/servicios',
  },
  {
    imagen: 'assets/img/slide/slide2.svg',
    titulo: 'Explora',
    subtitulo: '',
    texto: 'Ten la mayor cantidad de información para que tus vacaciones o escapadas sean increíbles',
    redirectTo: '/servicios',
  },
  {
    imagen: 'assets/img/slide/slide3.svg',
    titulo: 'Crea un grupo',
    subtitulo: '',
    texto: 'Conecta con otros viajeros para crear nuevas amistades y experiencias',
    redirectTo: '/servicios',
  },
  {
    imagen: 'assets/img/slide/slide8.svg',
    titulo: 'Misiones y Retos',
    subtitulo: '',
    texto: 'Completa misiones, gana experiencia y desbloquea premios al subir de nivel',
    redirectTo: '/servicios',
  },    
];

slide1: Slide1[] = [
  {
  imagen: 'assets/img/slide1/banner_1.jpg',
  titulo: '',
  redirectTo: 'https://chile.travel/',
  },
  {
  imagen: 'assets/img/slide1/banner_2.jpg',
  titulo: '',
  redirectTo: 'https://ingresorapanui.interior.gob.cl',
  },
  {
  imagen: 'assets/img/slide1/banner_3.jpg',
  titulo: '',
  redirectTo: 'https://chileestuyo.cl/wp-content/uploads/2019/09/DECALOGO-BUEN-TURISTA-RAPA-NUI-V3.pdf',
  },
  {
    imagen: 'assets/img/slide1/banner_4.jpg',
    titulo: '',
    redirectTo: 'https://www.sernatur.cl/operatividad-y-recomendaciones-de-las-regiones-del-pais/',
  },    
  {
    imagen: 'assets/img/slide1/banner_5.png',
    titulo: '',
    redirectTo: 'https://chileestuyo.cl/',
  },              
];

destinos: Destinos[] = [ 
  {
    imagen: 'assets/img/proyecArqui/esta1.jpg',
    titulo: 'Viña',   
    redirectTo: '/servicios',
  },
  {
    imagen: 'assets/img/proyecArqui/esta2.jpg',
    titulo: 'Viña',
    redirectTo: '/servicios',
  },
  {
    imagen: 'assets/img/proyecArqui/esta3.jpg',
    titulo: 'Valpo',
    redirectTo: '/servicios',
  },
  {
    imagen: 'assets/img/proyecArqui/esta4.jpg',
    titulo: 'Viña',
    redirectTo: '/servicios',
  },
];
exp: Destinos[] = [ 
  {
    imagen: 'assets/img/proyecArqui/esta5.jpg',
    titulo: 'Viña.',   
    redirectTo: 'https://www.google.com',
  },
  {
    imagen: 'assets/img/proyecArqui/esta6.jpg',
    titulo: 'Valpo',
    redirectTo: 'www.google.com',
  },
  {
    imagen: 'assets/img/proyecArqui/esta7.jpg',
    titulo: 'Viña',
    redirectTo: 'www.google.com',
  },
  {
    imagen: 'assets/img/proyecArqui/esta8.jpg',
    titulo: 'Viña',
    redirectTo: 'www.google.com',
  },
]


loadProduct(){
  this.firestore.getCollection<Productos>(this.path).subscribe(res=>{
    console.log(res)
    this.productos=res;
  })
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
  a11:string,
  producto:Productos) {
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
      producto:producto
      
      
    }
    
  });
  return await modal.present();
}




















//slide
public slideOpts2 = {
  slidesPerView: 1.8,
  spaceBetween:20,
}
public slideOpts3 = {
  slidesPerView: 2.4,
  spaceBetween:20,
  
}
public slideOpts4 = {
  slidesPerView: 1.2,
  spaceBetween:20,
  
}
public slideOpts = {
  slidesPerView: 1.2,
  spaceBetween: 50,
  centeredSlides: true,
  initialSlide: 2,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    beforeInit() {
      const swiper = this;

      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate() {
      const swiper = this;
      const {
        width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform$$1 = swiper.translate;
      const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate = params.depth;
      // Each slide offset from center
      for (let i = 0, length = slides.length; i < length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideSize = slidesSizesGrid[i];
        const slideOffset = $slideEl[0].swiperSlideOffset;
        const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        let translateZ = -translate * Math.abs(offsetMultiplier);

        let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;

        const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

      }

      // Set correct perspective for IE10
      if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
        const ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = `${center}px 50%`;
      }
    },
    setTransition(duration) {
      const swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    }
  }
}


}
