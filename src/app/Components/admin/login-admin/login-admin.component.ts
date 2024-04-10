import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  adminForm!:FormGroup;
  constructor(private fb:FormBuilder,private adminService:AdminService,
    private router:Router) { }

  
  ngOnInit(): void {

    this.adminForm=this.fb.nonNullable.group({
      identifiant:[''],
      password:['']
    });
   

   
  }

  log()
  {
    this.adminService.login(this.adminForm.value).subscribe(data=>{
      localStorage.setItem('adminToken',data.token);
      this.router.navigate(['/admindash'])

      
  },
  (error)=>{
    console.log("error");
  }
    )}

}
