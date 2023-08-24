import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Appartements } from 'src/app/entities/appartements';
import { AppartementService } from 'src/app/services/appartement.service';
import { CalendrierService } from 'src/app/services/calendrier.service';

@Component({
  selector: 'app-list-apart-colab',
  templateUrl: './list-apart-colab.component.html',
  styleUrls: ['./list-apart-colab.component.css']
})
export class ListApartColabComponent implements OnInit {
  Aparts!:Appartements[];
  calenders:any[]=[];
  availabilities:any[]=[];
  colaborateur:any;
  jwt=new JwtHelperService();
  constructor(private calenderService:CalendrierService,private appartService:AppartementService,
    private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('colabToken')==null){
      this.router.navigate(['/colabLogin']);
      
    }
    this.colaborateur=this.jwt.decodeToken(localStorage.getItem('colabToken')!)._id;
    
    this.appartService.getAppartements().subscribe(data => {
      this.Aparts = data;
     
    
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
    
          
        })
        .catch(error => {
          console.error('Error retrieving calenders:', error);
        });
    });
  }
  disconnect(){
    localStorage.removeItem('colabToken');
    this.router.navigate(['/colabLogin']);
  }

 
  

}
