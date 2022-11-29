import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AccueilEmployeComponent } from './components/accueil-employe/accueil-employe.component';
import { ContactEmployeComponent } from './components/contact-employe/contact-employe.component';
import { DashDirecteurComponent } from './components/dash-directeur/dash-directeur.component';
import { DashboardEmployeComponent } from './components/dashboard-employe/dashboard-employe.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuEmployeComponent } from './components/menu-employe/menu-employe.component';
import { PresentationComponent } from './components/presentation/presentation.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    AccueilEmployeComponent,
    ContactEmployeComponent,
    DashDirecteurComponent,
    DashboardEmployeComponent,
    HomeComponent,
    MenuComponent,
    MenuEmployeComponent,
    PresentationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
