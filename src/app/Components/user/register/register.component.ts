import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  constructor(private fb:FormBuilder,private serviceUser:UserService,
    private router:Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.userForm=this.fb.nonNullable.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['']
    });
  }


  creer()
  { 
      if (this.userForm.value['firstName']=="" || this.userForm.value['lastName']=="" || this.userForm.value['email']=="" || this.userForm.value['password']=="")
      {
        alert("veuillez remplir tous les champs");
      }
      else if(this.userForm.value['password'].length<8)
      {
        alert("le mot de passe doit contenir au moins 8 caractères")
      }
      else
      {
      this.serviceUser.register(this.userForm.value).subscribe(data=>{
        
        localStorage.setItem('userToken',data.token);
        alert("Vous êtes inscrit");
        this.router.navigate(['/home']);

      },
      err=>{alert("email déja utilisé")}
      )
    }
  }

}
