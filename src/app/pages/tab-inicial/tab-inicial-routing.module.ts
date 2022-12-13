import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: 'tab-inicial',
    component: TabInicialPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./../../pages/home/home.module').then( m => m.HomePageModule)
      },
      
      {
        path: 'game',
        loadChildren: () => import('./../../pages/game/game.module').then( m => m.GamePageModule)
      },
      {
        path: 'reservas',
        loadChildren: () => import('./../../pages/reservas/reservas.module').then( m => m.ReservasPageModule)
      },
      
      {
        path: 'perfil-bf',
        loadChildren: () => import('./../../pages/perfil-bf/perfil-bf.module').then( m => m.PerfilBfPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./../../pages/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./../../pages/maps/maps.module').then( m => m.MapsPageModule)
      },
      
      {
        path: '',
        redirectTo: '/tab-inicial/home',
        pathMatch: 'full'
      }
    ]
    
  },
  {
    path: '',
    redirectTo: '/tab-inicial/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
