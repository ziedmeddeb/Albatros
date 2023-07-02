import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-list-reser',
  templateUrl: './list-reser.component.html',
  styleUrls: ['./list-reser.component.css']
})
export class ListReserComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
    private serviceReserv:ReserveService) { }

  dateDeb!:Date;
  dateFin!:Date;
  listReserv:any[]=[];
  ngOnInit(): void {
    this.dateDeb=this.activatedRoute.snapshot.params["dateDeb"];
    this.dateFin=this.activatedRoute.snapshot.params["dateFin"];
    this.serviceReserv.getReserveByDate(this.dateDeb).subscribe(data=>{
      this.listReserv=data;
      
    }
    );

  }

}
