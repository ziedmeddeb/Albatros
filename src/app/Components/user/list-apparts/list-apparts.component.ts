import { Component, OnInit } from '@angular/core';
import { Appartements } from 'src/app/entities/appartements';
import { AppartementService } from 'src/app/services/appartement.service';

@Component({
  selector: 'app-list-apparts',
  templateUrl: './list-apparts.component.html',
  styleUrls: ['./list-apparts.component.css']
})
export class ListAppartsComponent implements OnInit {
listAparts!:Appartements[];
listAparts1!:Appartements[]; 
  constructor(private apartService:AppartementService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.apartService.getAppartements().subscribe(data=>{
      this.listAparts=data;
      this.listAparts1=data;
      console.log(data);
    }
    );
  }

  filter(val: string) {
    if (val == "all") {
      this.listAparts = this.listAparts1;
     
    }
    if (val == "S+1") {
      this.listAparts = this.listAparts1.filter(res => res.categ == 'S+1');
      
    }
    if (val == "S+2") {
      this.listAparts = this.listAparts1.filter(res => res.categ == 'S+2');
      
    }
    
  }
  

}
