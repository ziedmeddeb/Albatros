import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { ColabServiceService } from 'src/app/services/colab-service.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-selected-apart-colab',
  templateUrl: './selected-apart-colab.component.html',
  styleUrls: ['./selected-apart-colab.component.css']
})
export class SelectedApartColabComponent implements OnInit {
  showForm = true;
  reservForm!: FormGroup;
  user: any;
  idApart!: string;
  datede!: string;
  idCal!: string;
  modifFormAdmin!: FormGroup;
  adminres = false;
  reservations: any[] = [];
  jwt=new JwtHelperService();
  cod:any;
  dateFin!: string;
  constructor( private activatedRoute: ActivatedRoute,
    private serviceRes: ReserveService,
    private serviceUser: UserService,
    private calendService: CalendrierService,
    private fb: FormBuilder,
    private colabservice:ColabServiceService) { }

  ngOnInit(): void {
    this.idApart = this.activatedRoute.snapshot.params['id'];
    this.datede = this.activatedRoute.snapshot.params['calender'];
    this.idCal = this.activatedRoute.snapshot.params['idCal'];
    this.cod = this.activatedRoute.snapshot.params['cod'];
    
    this.dateFin = this.activatedRoute.snapshot.params['dateFin'];

    this.serviceRes
    .getReserveByApartIdAndDate(this.idApart, this.datede)
    .subscribe((data) => {
      this.reservations = data;
      const confirmedReservations = this.reservations.filter(
        (elt) => ['En cours', 'Payé', 'Avance', 'Amicale'].includes(elt.status)
      );

      if (confirmedReservations.length > 0) {

      this.user=confirmedReservations[0];
              
              this.showForm = false;
              this.adminres = true;
                
                this.modifFormAdmin = this.fb.group({
                  firstName: [this.user.firstName],
                  lastName: [this.user.lastName],
                  cin: [this.user.cin],
                  ntel: [this.user.ntel],
                  
                  status: [this.user.status],
                  remarque:[this.user.remarque]
                });

              }
              else{
                this.showForm = true;
                this.adminres = false;
              }
              
            });
            
             this.reservForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      cin: [''],
      ntel: [''],
      dateRes: new Date(Date.now()),
      status: [''],
      remarque:['']
    });  
            
  }
  


  reser() {
    this.colabservice.getColabById(this.jwt.decodeToken(localStorage.getItem('colabToken')!)._id).subscribe(data=>{
      
    this.serviceRes
      .createReserve({
        firstName: this.reservForm.value.firstName,
        lastName: this.reservForm.value.lastName,
        appartement: this.idApart,
        cin: this.reservForm.value.cin,
        dateRes: this.reservForm.value.dateRes,
        ntel: this.reservForm.value.ntel,
        date: this.datede,
        status:this.reservForm.value.status,
        nom:data.firstName + " " + data.lastName,
        remarque:this.reservForm.value.remarque,
        code:this.cod,
      })
      .subscribe((data) => {
        this.user = this.reservForm.value;
          this.calendService
            .updateCalendrierBydate(this.idApart, this.idCal,this.reservForm.value.status,
              this.jwt.decodeToken(localStorage.getItem('colabToken')!)._id,"colab",
              this.reservForm.value.firstName + ' ' + this.reservForm.value.lastName)
            .subscribe((data) => {
             
              window.location.reload();
            });
        });
      });
      
      
  }


  annuler1() {
    this.calendService
      .updateCalendrierBydate2(this.idApart, this.idCal,"annulé")
      .subscribe((data) => {
        this.serviceRes.annulerReserv(this.user._id).subscribe((data) => {
          
          
        });
        this.adminres = false;
        this.showForm = true;
        
        
      });
  }

  modifadmin()
  {
    
    this.serviceRes.updateReserve(this.user._id,this.modifFormAdmin.value).subscribe((data) => {
      console.log(data);
      this.calendService
      .updateCalendrierBydate(this.idApart, this.idCal,this.modifFormAdmin.value.status,
        this.jwt.decodeToken(localStorage.getItem('colabToken')!)._id,"colab",
        this.modifFormAdmin.value.firstName + ' ' + this.modifFormAdmin.value.lastName)
      .subscribe((data) => {
        window.location.reload();
      });
    });
  }


}
