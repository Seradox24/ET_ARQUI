import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-perfil-bf',
  templateUrl: './perfil-bf.page.html',
  styleUrls: ['./perfil-bf.page.scss'],
})
export class PerfilBfPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async modalAuth(){
  const modal = await this.modalCtrl.create({
    component: LoginPage,
    
});
    await modal.present();
  }



}
