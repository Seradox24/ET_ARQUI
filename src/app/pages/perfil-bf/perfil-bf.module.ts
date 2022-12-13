import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilBfPageRoutingModule } from './perfil-bf-routing.module';

import { PerfilBfPage } from './perfil-bf.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilBfPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PerfilBfPage]
})
export class PerfilBfPageModule {}
