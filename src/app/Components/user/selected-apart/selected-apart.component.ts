import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Appartements } from 'src/app/entities/appartements';
import { Calendrier } from 'src/app/entities/calendrier';
import { Image } from 'src/app/entities/image';
import { AppartementService } from 'src/app/services/appartement.service';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { ImageService } from 'src/app/services/image.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';
import listPlugin from '@fullcalendar/list';
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
  demandForm!:FormGroup;
  selectedBox!: HTMLElement;
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
    private cdr:ChangeDetectorRef) {
      this.demandForm = this.fb.group({
        nom: ['', Validators.required],
        ntel: ['', Validators.required]
      });
    }
    calendarOptions: CalendarOptions = {
      height: 'auto', // Adjust the height based on the content
      
      headerToolbar: { left: '', center: '', right: '' },
      plugins: [multiMonthPlugin],
      initialView: 'multiMonthFourMonth',
      locale: 'fr',
      displayEventTime: false,
      initialDate: new Date(new Date().getFullYear(), 5),
      eventClick: this.handleEventClick.bind(this),
      dayMaxEvents: 1,
      eventContent: function(arg) {
        // Check if the screen width is less than 515px
        if (window.innerWidth < 515) {
          // Display only the first few characters of the event title
          return { html: arg.event.title.substring(0, 26) };
        } else {
          // Display the full event title
          return { html: arg.event.title };
        }
      },
      views: {
        multiMonthFourMonth: {
          type: 'multiMonthYear',
          duration: { months: 4 },
        }
      },
      
      
    
      events: [
        // Your event data here
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
            allDay: true,
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
  
  envoyerDemande() {
    if (this.demandForm.valid) {
      const demande = {
        nom: this.demandForm.value.nom,
        ntel: this.demandForm.value.ntel,
        dateRes: new Date(Date.now()),
        date: this.selectedDateDeb,
        code: this.Apart.code,
        appartement: this.idAp
      };
      
      this.reserveService.createReserve(demande).subscribe(
        data => {
          alert("Votre demande de réservation a été envoyée avec succès. Nous vous contacterons bientôt.");
          this.showForm = false;
          this.demandForm.reset();
        },
        error => {
          console.log("error", error);
          alert("Une erreur s'est produite. Veuillez réessayer.");
        }
      );
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
