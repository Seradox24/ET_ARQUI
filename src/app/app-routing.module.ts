import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tab-inicial/tab-inicial.module').then(m => m.TabInicialPageModule)
  },
  
  
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  
  
  {
    path: 'tab-inicial',
    loadChildren: () => import('./pages/tab-inicial/tab-inicial.module').then( m => m.TabInicialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },

  // {
  //   path: 'modal-producto',
  //   loadChildren: () => import('./pages/modal-producto/modal-producto.module').then( m => m.ModalProductoPageModule)
  // },
  

  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
