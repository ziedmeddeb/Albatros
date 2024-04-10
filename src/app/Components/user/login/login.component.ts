import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userForm!:FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.userForm=this.fb.nonNullable.group({
      email:[''],
      password:['']
    });
   

   
  }

  log()
  {
    if(this.userForm.value['email']=="" || this.userForm.value['password']=="")
    {
      alert("veuillez remplir tous les champs");
    }
    else
    {

    this.userService.login(this.userForm.value).subscribe(data=>{
      if (data && data.token) {
      localStorage.setItem('userToken',data.token);
      alert("Vous êtes connecté");
      this.router.navigate(['/home']);}
      else{
        alert("Données éronnées")
      }
  }
  ,
  err=>{alert("Données éronnées")}
    )}
}
}
