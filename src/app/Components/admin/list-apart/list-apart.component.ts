import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appartements } from 'src/app/entities/appartements';
import { AppartementService } from 'src/app/services/appartement.service';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-list-apart',
  templateUrl: './list-apart.component.html',
  styleUrls: ['./list-apart.component.css']
})
export class ListApartComponent implements OnInit {
 Aparts!:Appartements[];
 calenders:any[]=[];
 availabilities:any[]=[];
  constructor(private calenderService:CalendrierService,private appartService:AppartementService,
    private router:Router,
      private _swPush:SwPush,
      private notifService:NotificationService) { }

    
  ngOnInit(): void {

    if(localStorage.getItem('adminToken')==null){
      this.router.navigate(['/adminlog']);
    }
    
    
    this.requestSubscription();
    


    this.appartService.getAppartements().subscribe(data => {
      this.Aparts = data;
      console.log(this.Aparts);
    
      const promises = this.Aparts.map(element => {
        return this.calenderService.getCalendrierByApartId(element._id).toPromise();
      });
    
      Promise.all(promises)
        .then(calendersData => {
          this.calenders = [];
    
          this.Aparts.forEach((apart, index) => {
            const calenderData = calendersData[index];
            const calender = {
              appartement: apart,
              calendrier: calenderData
            };
    
            this.calenders.push(calender);
            this.availabilities = calenderData.availabilities;
          });
    
          console.log(this.calenders);
        })
        .catch(error => {
          console.error('Error retrieving calenders:', error);
        });
    });
    

    
  }

  requestSubscription = () => {
    
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: 'BKAYo_k46kJ8vPec8BQLPVCv8xyTUJh9RRz3nJ23TnOQQ5KZqO7bk8UqNTlTHgpkDBr9nTqRP_MO_0p615cEcy4'
    }).then((_) => {
      console.log(JSON.stringify(_));
      this.notifService.stockUserSub(_).subscribe((_) => console.log(_));
    }).catch((_) => console.log);
  };

  

}
