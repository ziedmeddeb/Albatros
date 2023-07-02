import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CalendrierService } from 'src/app/services/calendrier.service';
import { ReserveService } from 'src/app/services/reserve.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-selected-apart',
  templateUrl: './admin-selected-apart.component.html',
  styleUrls: ['./admin-selected-apart.component.css']
})
export class AdminSelectedApartComponent implements OnInit {
  idApart!: string;
  datede!: string;
  idCal!: string;
  showForm = false;
  reserve = true;
  reserve1 = false;
  adminres = false;
  reservForm!: FormGroup;
  user: any;

  users: any[] = [];
  reservations: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceRes: ReserveService,
    private serviceUser: UserService,
    private calendService: CalendrierService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idApart = this.activatedRoute.snapshot.params['id'];
    this.datede = this.activatedRoute.snapshot.params['calender'];
    this.idCal = this.activatedRoute.snapshot.params['idCal'];

    this.serviceRes
      .getReserveByApartIdAndDate(this.idApart, this.datede)
      .subscribe((data) => {
        this.reservations = data;
        const confirmedReservations = this.reservations.filter(
          (elt) => elt.status == 'confirmé'
        );
        console.log(confirmedReservations);
       
          if (confirmedReservations.length > 0) {
            
            if (confirmedReservations[0].user != null) {
              console.log(confirmedReservations[0].user);

              this.serviceUser.getUserById(confirmedReservations[0].user).subscribe((data1) => {
                this.users.push({ user: data1, reser: confirmedReservations[0] });
                this.reserve = false;
                this.adminres = false;
                this.reserve1 = true;
              });
            }
            else{
              this.user=confirmedReservations[0];
              
              this.reserve1 = false;
              this.reserve = false;
                this.adminres = true;
            }
          } else {
            this.reservations.forEach((element) => {
            this.serviceUser.getUserById(element.user).subscribe((data) => {
              this.users.push({ user: data, reser: element });
            });
          });
          }
        
      });

    this.reservForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      cin: [''],
      ntel: [''],
      region: ['']
    });
  }

  confirmRes(id: string) {
    this.calendService
      .updateCalendrierBydate(this.idApart, this.idCal)
      .subscribe((data) => {
        console.log(data);
        this.serviceRes.updateReserve(id).subscribe((data) => {
          console.log(data);
        });
        window.location.reload();
      });
  }

  show() {
    this.showForm = true;
  }

  annuler() {
    this.calendService
      .updateCalendrierBydate2(this.idApart, this.idCal)
      .subscribe((data) => {
        this.serviceRes.annulerReserv(this.users[0].reser._id).subscribe((data) => {
          console.log(data);
        });
        this.reserve1 = false;
        this.adminres = false;
        this.reserve = true;
        
      });
  }

  reser() {
    this.serviceRes
      .createReserve({
        firstName: this.reservForm.value.firstName,
        lastName: this.reservForm.value.lastName,
        appartement: this.idApart,
        cin: this.reservForm.value.cin,
        region: this.reservForm.value.region,
        ntel: this.reservForm.value.ntel,
        date: this.datede
      })
      .subscribe((data) => {
        this.user = this.reservForm.value;
        this.serviceRes.updateReserve(data._id).subscribe((data1) => {
          this.adminres = true;
          this.calendService
            .updateCalendrierBydate(this.idApart, this.idCal)
            .subscribe((data) => {
              console.log(data);
              window.location.reload();
            });
        });
        
      });
      
  }


  annuler1() {
    this.calendService
      .updateCalendrierBydate2(this.idApart, this.idCal)
      .subscribe((data) => {
        this.serviceRes.annulerReserv(this.user._id).subscribe((data) => {
          console.log(data);
          this.adminres = false;
        this.reserve1 = false;
        this.reserve = true;
        });
        window.location.reload();
      });
  }
}
