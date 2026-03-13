import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Appartements } from 'src/app/entities/appartements';
import { AppartementService } from 'src/app/services/appartement.service';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { ColabServiceService } from 'src/app/services/colab-service.service';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from 'src/app/services/notification.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-list-apart',
  templateUrl: './list-apart.component.html',
  styleUrls: ['./list-apart.component.css']
})
export class ListApartComponent implements OnInit {
 Aparts!:Appartements[];
 calenders:any[]=[];
 availabilities:any[]=[];
 showColabModal = false;
 colabForm!: FormGroup;
  constructor(private calenderService:CalendrierService,private appartService:AppartementService,
    private router:Router,
      private _swPush:SwPush,
      private notifService:NotificationService,
      private colabService: ColabServiceService,
      private fb: FormBuilder) {
        this.colabForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          identifiant: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(4)]]
        });
      }

      calendarOptions: CalendarOptions = {

        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        locale:'fr',
        displayEventTime: false,
        initialDate: new Date(new Date().getFullYear(), 5),
        // eventClick: this.handleEventClick.bind(this),
        events: []
      };
    
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

  requestSubscription = () => {
    
    if (!this._swPush.isEnabled) {
      console.log("Notification is not enabled.");
      return;
    }
    this._swPush.requestSubscription({
      serverPublicKey: 'BEGDn-yTN_RAqKQbhPkPQauzuVUy0XzKAhUsLjmjCCAb-5r8DSRVz4kCYBJVShL5mcT1UxFBRhl-AQ42_-SbU0w'
    }).then((_) => {
      console.log(JSON.stringify(_));
      const subscriptionObject = JSON.parse(JSON.stringify(_));
      const p256dhValue = subscriptionObject.keys.p256dh;
      const authValue = subscriptionObject.keys.auth;
      this.notifService.stockUserSub({endpoint:_.endpoint,
        p256dh:p256dhValue,
        auth:authValue,
        role:"admin"

      
      }).subscribe((_) => console.log(_));
      
    }).catch((_) => console.log);
  };

  openColabModal() {
    this.showColabModal = true;
  }

  closeColabModal() {
    this.showColabModal = false;
    this.colabForm.reset();
  }

  createColab() {
    if (this.colabForm.valid) {
      this.colabService.register(this.colabForm.value).subscribe(
        data => {
          alert('Collaborateur créé avec succès!');
          this.closeColabModal();
        },
        error => {
          console.error('Error creating colab:', error);
          alert('Erreur lors de la création du collaborateur.');
        }
      );
    }
  }

}
