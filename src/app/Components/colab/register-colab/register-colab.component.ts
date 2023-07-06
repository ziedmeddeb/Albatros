import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColabServiceService } from 'src/app/services/colab-service.service';

@Component({
  selector: 'app-register-colab',
  templateUrl: './register-colab.component.html',
  styleUrls: ['./register-colab.component.css']
})
export class RegisterColabComponent implements OnInit {
  colabForm!:FormGroup;
  constructor(private fb:FormBuilder,private colabService:ColabServiceService,
    private router:Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.colabForm=this.fb.nonNullable.group({
      firstName:[''],
      lastName:[''],
      identifiant:[''],
      password:['']
    });
  }

  creer()
  { 
      if (this.colabForm.value['firstName']=="" || this.colabForm.value['lastName']=="" || this.colabForm.value['identifiant']=="" || this.colabForm.value['password']=="")
      {
        alert("veuillez remplir tous les champs");
      }
      else if(this.colabForm.value['password'].length<8)
      {
        alert("le mot de passe doit contenir au moins 8 caractères")
      }
      else
      {
      this.colabService.register(this.colabForm.value).subscribe(data=>{
        
        localStorage.setItem('colabToken',data.token);
        alert("Vous êtes inscrit");
        this.router.navigate(['/colabdash']);

      },
      err=>{alert("identifiant déja utilisé")}
      )
    }
  }

}
