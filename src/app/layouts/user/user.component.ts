
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showSignin=true;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('userToken')!=null)
    {
      this.showSignin=false;
    }
    else
    {
      this.showSignin=true;
    }
  }

  Disconnect()
  {
    localStorage.removeItem('userToken');
    window.location.reload();
  }

}
