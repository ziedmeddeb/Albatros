import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { an } from '@fullcalendar/core/internal-common';
import multiMonthPlugin from '@fullcalendar/multimonth';
// import frLocale from "@fullcalendar/core/locales/fr";
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
  events:any[]=[];
  selectedDate!:any;  
  selectedDateDeb!:any; 
 prix!:number;
  constructor(private activatedRoute: ActivatedRoute,
    private serviceApart:AppartementService,private imageService:ImageService
    ,private serviceCalen:CalendrierService,
    private reserveService:ReserveService,
    private fb:FormBuilder,
    private router:Router,
    private userService:UserService,
    private cdr:ChangeDetectorRef) { }
    calendarOptions: CalendarOptions = {
      
      height: 900,
     
      headerToolbar: {left:'', center: '', right: '' },
      plugins: [dayGridPlugin,multiMonthPlugin],
      initialView: 'multiMonthFourMonth',
      locale:'fr',
      displayEventTime: false,
      initialDate: new Date(new Date().getFullYear(), 5),
      eventClick: this.handleEventClick.bind(this),
      views: {
        multiMonthFourMonth: {
          type: 'multiMonthYear',
          duration: { months: 4 }
        }
      },
      events: [
       
      ]
    };

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.idAp=this.activatedRoute.snapshot.params["id"];
    this.serviceApart.getApartById(this.idAp).subscribe(data=>{
      this.Apart=data;
      this.imageService.getImagebyApartId(this.idAp).subscribe(data1=>{
        this.images=data1;
        
      },
      (error)=>{
        console.log("error");
      }
      );
      
    },
    (error)=>{
      console.log("error");
    
    }
    
      );
    
   
      this.serviceCalen.getCalendrierByApartId(this.idAp).subscribe(data => {
        this.calender = data; 
        console.log(this.calender);
        
        for(let i=0;i<this.calender.availabilities.length;i++)
        {
          let color = this.calender.availabilities[i].available ? '#76F467' : '#F94C46';
        console.log("dateee",this.calender.availabilities[i].dateDeb)
          this.events.push({ 
            title: this.calender.availabilities[i].available ? 'Disponible - Prix: ' + this.calender.availabilities[i].price +' dt': 'Non disponible', 
            start: new Date(this.calender.availabilities[i].dateDeb), 
            end : new Date(this.calender.availabilities[i].dateFin), 
            backgroundColor: color, 
            
            


             
            
          });
        }
        this.calendarOptions = {
          ...this.calendarOptions,
          events: this.events,
        };
        this.cdr.detectChanges();
        console.log("eventtss",this.calendarOptions.events);
        
        
      },
      (error)=>{
        console.log("error");
      
      });
    
     


    
      console.log("eventtss11",this.calendarOptions.events);

    
  }

  show(){
    // this.selectedCell = c;
    
    this.showForm=true;
    setTimeout(() => {
      const element = document.getElementById('reserve');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0); 
    
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
        date:this.selectedDateDeb,
        code:this.Apart.code,
        appartement:this.idAp,user:this.jwt.decodeToken(localStorage.getItem('userToken')!)['_id']}).subscribe(data=>{
        
          alert("demande de reservation a été envoyé avec succès");
          
        },
        (error)=>{
          console.log("error");
        }
        );
      },
      (error)=>{
        console.log("error");
      
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
  handleEventClick(arg:any){
    if (arg.event.backgroundColor === '#F94C46') {
      alert('Cette date n\'est pas disponible pour la réservation. Veuillez choisir une autre date.');
      return;
    }
    console.log(arg.event.start , ' ', arg.event.end);
    let dateDeb = new Date(arg.event.start) ;
   

    let dateFin = new Date(arg.event.end);
    dateFin.setDate(dateFin.getDate() - 1);
   this.selectedDateDeb=new Date(arg.event.start)

    
    let formattedDateStart = dateDeb.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let formattedDateEnd = dateFin.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    this.selectedDate = formattedDateStart + ' - ' + formattedDateEnd;
    this.prix=arg.event.title.split(':')[1].split(' ')[1];
    this.show();
   

  }


 

}
