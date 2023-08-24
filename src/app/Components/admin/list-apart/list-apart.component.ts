import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appartements } from 'src/app/entities/appartements';
import { AppartementService } from 'src/app/services/appartement.service';
import { CalendrierService } from 'src/app/services/calendrier.service';

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
   ) { }

  ngOnInit(): void {

    if(localStorage.getItem('adminToken')==null){
      this.router.navigate(['/adminlog']);
    }


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

  pushSubscription()
  {
    
  }

}
