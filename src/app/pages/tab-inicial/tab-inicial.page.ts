import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-tab-inicial',
  templateUrl: './tab-inicial.page.html',
  styleUrls: ['./tab-inicial.page.scss'],
})
export class TabInicialPage implements OnInit {

  estado: String;
  estadob: boolean;
  pagina: String;

  constructor(private authService: AuthService,private firestore: DatabaseService,private router: Router,) { 

    this.authService.stateAuth().subscribe(res=>{
      if(res!==null){
        this.estado=res.uid;
        this.pagina="perfil"
      }else{
        this.pagina="perfil-bf"
      }
    });

    this.navState();


  }

  ngOnInit() {
    console.log(this.authService.stateAuth());
    
    this.navState();
  }

  async navState(){
    console.log(this.estado)

  }


  

  



}

