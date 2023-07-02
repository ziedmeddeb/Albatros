import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm!:FormGroup;
  user!:User;
  constructor(private fb:FormBuilder,private userService:UserService,
    private router:Router) { }
  jwt=new JwtHelperService();
  ngOnInit(): void {
    if(!localStorage.getItem('userToken'))
    {
      this.router.navigate(['/login']);
    }
    this.userService.getUserById(this.jwt.decodeToken(localStorage.getItem('userToken')!)['_id']).subscribe(data=>{
      this.user=data;
      this.initForm();
    });
    

  }

  initForm()
  {
    this.userForm=this.fb.nonNullable.group({
      firstName:[this.user.firstName],
      lastName:[this.user.lastName],
      email:[this.user.email],

    });

  }

  update()
  {
    let token=localStorage.getItem('userToken');
    if(token)
    { 
      if(this.userForm.value['firstName']=="" || this.userForm.value['lastName']=="" || this.userForm.value['email']=="")
      {
        alert("veuillez remplir tous les champs");
      }
      else{
      
      this.userService.updateUser(this.jwt.decodeToken(token)._id,this.userForm.value).subscribe(data=>{
      alert("profil modifié avec succès");
      this.router.navigate(['/home']);
    },
    err=>{alert("erreur lors de la modification du profil")}
    );
  }
    
    }

   
  }

}
