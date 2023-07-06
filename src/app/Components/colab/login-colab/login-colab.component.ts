import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ColabServiceService } from 'src/app/services/colab-service.service';

@Component({
  selector: 'app-login-colab',
  templateUrl: './login-colab.component.html',
  styleUrls: ['./login-colab.component.css']
})
export class LoginColabComponent implements OnInit {

  colabForm!:FormGroup;
  constructor(private colabService:ColabServiceService,private fb:FormBuilder,
    private router:Router ) { }

  ngOnInit(): void {
    this.colabForm=this.fb.nonNullable.group({
      identifiant:[''],
      password:['']
    });
  }

  log()
  {
    if(this.colabForm.value['identifiant']=="" || this.colabForm.value['password']=="")
    {
      alert("veuillez remplir tous les champs");
    }
    else
    {
    this.colabService.login(this.colabForm.value).subscribe(data=>{
      localStorage.setItem('colabToken',data.token);
      alert("Vous êtes connecté");
      this.router.navigate(['/colabdash']);
  }
  ,
  err=>{alert("Données éronnées")}
    )}
      
  }

    

}
