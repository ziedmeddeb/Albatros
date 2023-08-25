import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './layouts/user/user.component';
import { ContactComponent } from './Components/user/contact/contact.component';

import { ListAppartsComponent } from './Components/user/list-apparts/list-apparts.component';
import { AboutComponent } from './Components/user/about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectedApartComponent } from './Components/user/selected-apart/selected-apart.component';

import { RegisterComponent } from './Components/user/register/register.component';
import { LoginComponent } from './Components/user/login/login.component';
import { ErrorPageComponent } from './Components/user/error-page/error-page.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { ChangePassComponent } from './Components/user/change-pass/change-pass.component';
import { LoginAdminComponent } from './Components/admin/login-admin/login-admin.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ListApartComponent } from './Components/admin/list-apart/list-apart.component';
import { AdminSelectedApartComponent } from './Components/admin/admin-selected-apart/admin-selected-apart.component';
import { ListReserComponent } from './Components/admin/list-reser/list-reser.component';
import { RegisterColabComponent } from './Components/colab/register-colab/register-colab.component';
import { LoginColabComponent } from './Components/colab/login-colab/login-colab.component';
import { ListApartColabComponent } from './Components/colab/list-apart-colab/list-apart-colab.component';
import { SelectedApartColabComponent } from './Components/colab/selected-apart-colab/selected-apart-colab.component';
import { SiteArchComponent } from './Components/user/site-arch/site-arch.component';
import { LoisirComponent } from './Components/user/loisir/loisir.component';
import { SwPush, ServiceWorkerModule } from '@angular/service-worker';





@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ContactComponent,
 
    ListAppartsComponent,
    AboutComponent,
    SelectedApartComponent,
    RegisterComponent,
    LoginComponent,
    ErrorPageComponent,
    ProfileComponent,
    ChangePassComponent,
    LoginAdminComponent,
    AdminComponent,
    ListApartComponent,
    AdminSelectedApartComponent,
    ListReserComponent,
    RegisterColabComponent,
    LoginColabComponent,
    ListApartColabComponent,
    SelectedApartColabComponent,
    SiteArchComponent,
    LoisirComponent
 
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    
    
    
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
