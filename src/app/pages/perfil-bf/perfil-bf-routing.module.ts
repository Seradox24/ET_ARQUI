import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilBfPage } from './perfil-bf.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilBfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilBfPageRoutingModule {}
