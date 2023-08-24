
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

  closeMenu() {
    // Find the navbar-toggler button and click it to close the menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
      (navbarToggler as HTMLElement).click();
    }
  }

  Disconnect()
  {
    localStorage.removeItem('userToken');
    window.location.reload();
  }

}
