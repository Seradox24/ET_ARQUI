import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {HttpClientModule}from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ParallaxHeaderDirective } from './directives/parallax-header.directive';
import { AdminPipe } from './pages/admin.pipe';




@NgModule({
  declarations: [AppComponent, ParallaxHeaderDirective, AdminPipe],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideStorage(() => getStorage()),
    HttpClientModule,
    AngularFireStorageModule
   
  ],
  providers: [Geolocation,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
