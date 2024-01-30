import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Appartements } from 'src/app/entities/appartements';
import { Calendrier } from 'src/app/entities/calendrier';
import { Image } from 'src/app/entities/image';
import { AppartementService } from 'src/app/services/appartement.service';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { ImageService } from 'src/app/services/image.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-selected-apart',
  templateUrl: './selected-apart.component.html',
  styleUrls: ['./selected-apart.component.css']
})
export class SelectedApartComponent implements OnInit {
  idAp!:string;
  Apart:any;
  images!:Image[];
  calender!:Calendrier;
  showForm=false;
  selectedCell: any;
  reservForm!:FormGroup;
  jwt=new JwtHelperService();
  selectedBox!: HTMLElement;
  user!:any;
  
 
  constructor(private activatedRoute: ActivatedRoute,
    private serviceApart:AppartementService,private imageService:ImageService
    ,private serviceCalen:CalendrierService,
    private reserveService:ReserveService,
    private fb:FormBuilder,
    private router:Router,
    private userService:UserService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.idAp=this.activatedRoute.snapshot.params["id"];
    this.serviceApart.getApartById(this.idAp).subscribe(data=>{
      this.Apart=data;
      this.imageService.getImagebyApartId(this.idAp).subscribe(data1=>{
        this.images=data1;
        
      }
      );
      
    }
    
      );
    
   
      this.serviceCalen.getCalendrierByApartId(this.idAp).subscribe(data => {
        this.calender = data; // Accessing the 'data' property of the response
        
      });
    
     


    
    

    
  }

  show(c:any){
    this.selectedCell = c;
    
    this.showForm=true;
    
  }
  
  reserver()
  {
    if(localStorage.getItem('userToken')!=null)
    {
      
        
         
          this.userService.getUserById(this.jwt.decodeToken(localStorage.getItem('userToken')!)['_id']).subscribe(data=>{
            this.user=data;
          
      this.reserveService.createReserve({
        firstName:this.user.firstName,lastName:this.user.lastName,
        dateRes:new Date(Date.now()),ntel:this.user.ntel,
        date:this.selectedCell.dateDeb,
        code:this.Apart.code,
        appartement:this.idAp,user:this.jwt.decodeToken(localStorage.getItem('userToken')!)['_id']}).subscribe(data=>{
        
          alert("demande de reservation a été envoyé avec succès");
          
        }
        );
      });
      
      }
      else{
        this.router.navigate(['/login']);
      }

  }

  onBoxClick(event: Event) {
    const element = event.target as HTMLElement;
    const boxInfos = document.querySelectorAll('.boxInfo'); // récupère tous les éléments avec la classe 'boxInfo'
    boxInfos.forEach((box) => {
      box.classList.remove('selectedC'); // supprime la classe 'selectedC' de tous les éléments 'boxInfo'
    });

    element.classList.add('selectedC'); // ajoute la classe 'selectedC' à l'élément DOM qui a été cliqué
  }
  

}
