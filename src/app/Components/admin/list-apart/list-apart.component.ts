import { Component, OnInit } from '@angular/core';
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
  constructor(private calenderService:CalendrierService,private appartService:AppartementService) { }

  ngOnInit(): void {
    this.appartService.getAppartements().subscribe(data => {
      this.Aparts = data;
      
      
     
  
      this.Aparts.forEach(element => {
        this.calenderService.getCalendrierByApartId(element._id).subscribe(data => {
          this.calenders.push({ appartement: element, calendrier: data });
          this.availabilities=data.availabilities;
         
          
        });
        
      });
     
     
      
    
    });

    
  }

}
