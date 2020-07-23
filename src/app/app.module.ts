import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

// Mòduls
import { AppRoutingModule } from './app-routing.module';

// Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';


// AngulartFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistreComponent } from './auth/registre/registre.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EntradaSortidaComponent } from './entrada-sortida/entrada-sortida.component';
import { EstadisticaComponent } from './entrada-sortida/estadistica/estadistica.component';
import { DetallComponent } from './entrada-sortida/detall/detall.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistreComponent,
    DashboardComponent,
    EntradaSortidaComponent,
    EstadisticaComponent,
    DetallComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
