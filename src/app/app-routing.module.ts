import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './Components/user/about/about.component';
import { ContactComponent } from './Components/user/contact/contact.component';
import { ListAppartsComponent } from './Components/user/list-apparts/list-apparts.component';
import { SelectedApartComponent } from './Components/user/selected-apart/selected-apart.component';
import { LoginComponent } from './Components/user/login/login.component';
import { RegisterComponent } from './Components/user/register/register.component';
import { UserComponent } from './layouts/user/user.component';
import { ProfileComponent } from './Components/user/profile/profile.component';
import { ChangePassComponent } from './Components/user/change-pass/change-pass.component';
import { LoginAdminComponent } from './Components/admin/login-admin/login-admin.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ListApartComponent } from './Components/admin/list-apart/list-apart.component';
import { AdminSelectedApartComponent } from './Components/admin/admin-selected-apart/admin-selected-apart.component';
import { ListReserComponent } from './Components/admin/list-reser/list-reser.component';



const routes: Routes = [
  {path:'',component:UserComponent, children:[
   
    {path:'about',component:AboutComponent,title:'About'},
    {path:'contact',component:ContactComponent,title:'Contact'},
    {path:'home',component:ListAppartsComponent,title:'List Appartements'},
    {path:'list/:id',component:SelectedApartComponent,title:'Selected Appartement'},
    
    {path:'',redirectTo:'home',pathMatch:'full'}
    
  ]},
 
  
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'register',component:RegisterComponent,title:'Register'},
  {path:'profile',component:ProfileComponent,title:'Profile'},
  {path:'changePass',component:ChangePassComponent,title:'Changer mot de passe'},
  {path:'admin',component:LoginAdminComponent,title:'Admin'},
  
  
 
  
  {path:'admindash',component:AdminComponent,title:'Admin Dashboard',children:
[
  {path:'listAparts',component:ListApartComponent,title:'List Appartements'},
  {path:'adminSelectedApart/:id/:calender/:idCal',component:AdminSelectedApartComponent,title:'Selected Appartement'},
  {path:'listReser/:dateDeb/:dateFin', component:ListReserComponent,title:'List Reservations'},
  {path:'',redirectTo:'listAparts',pathMatch:'full'},
  
  
]},
{path:'**',redirectTo:'home',pathMatch:'full'}

  

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
