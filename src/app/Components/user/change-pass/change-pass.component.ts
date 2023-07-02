import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  passForm!:FormGroup;
  helper=new JwtHelperService();
  constructor(private fb:FormBuilder,private userService:UserService
    ,private router:Router) { }


  ngOnInit(): void {
    if(!localStorage.getItem('userToken'))
    {
      this.router.navigate(['/login']);
    }
    this.initForm();
  }

  initForm()
  {
    this.passForm=this.fb.nonNullable.group({
        oldPassword:[''],
        newPassword:['']
    })
  }

  change()
  {
    if(this.passForm.value['oldPassword']=="" || this.passForm.value['newPassword']=="" )
    {
      alert("veuillez remplir tous les champs");
    }
    else
    {
      if(this.passForm.value['newPassword'].length<8)
      {
        alert("le mot de passe doit contenir au moins 8 caractères")
      }
      else{
    this.userService.changePass(this.helper.decodeToken(localStorage.getItem('userToken')!)._id,this.passForm.value).subscribe(
      data=>{
        
        alert("mot de passe changé avec succès");
      },
      (err:HttpErrorResponse)=>{alert("mot de passe incorrect")}
    );
  }
}
}

}
