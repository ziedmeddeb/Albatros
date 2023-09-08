import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
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
  dateFin!: string;
  showForm = false;
  reserve = true;
  reserve1 = false;
  adminres = false;
  reservForm!: FormGroup;
  modifForm!: FormGroup;
  modifFormAdmin!: FormGroup;
  user: any;
  person:any;
  jwt=new JwtHelperService(); 
  cod:any;

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
            
            if (confirmedReservations[0].user != null) {
              

              this.serviceUser.getUserById(confirmedReservations[0].user).subscribe((data1) => {
                this.users.push({ user: data1, reser: confirmedReservations[0] });
                this.reserve = false;
                this.adminres = false;
                this.reserve1 = true;
                this.modifForm = this.fb.group({
                  status: [this.users[0].reser.status],
                  remarque:[this.users[0].reser.remarque]
                });
              });
            }
            else{
              this.user=confirmedReservations[0];
              
              this.reserve1 = false;
              this.reserve = false;
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
      dateRes:new Date(Date.now()),
      status: [''],
      remarque:['']
    });

    

    

  }

  confirmRes(id: string,idres:string,i:number) {
    this.serviceUser.getUserById(id).subscribe((data) => {
    this.calendService
      .updateCalendrierBydate(this.idApart, this.idCal,"En cours",
      this.jwt.decodeToken(localStorage.getItem('adminToken')!)._id,"admin",
       data.firstName + ' ' + data.lastName)
      .subscribe((data1) => {
        
        
        this.serviceRes.updateReserve(idres,
          {firstName:data.firstName,
            lastName:data.lastName,
            appartement:this.idApart,
            status:"En cours",
            remarque:"",
            cin:this.users[i].reser.cin,
            
            ntel:this.users[i].reser.ntel,
            date:this.datede
            


            
            
            }
          ).subscribe((data) => {
          window.location.reload();
        });
        
      });
    });
  }

  show() {
    this.showForm = true;
  }

  annuler() {
    this.calendService
      .updateCalendrierBydate2(this.idApart, this.idCal,"annulé")
      .subscribe((data) => {
        this.serviceRes.annulerReserv(this.users[0].reser._id).subscribe((data) => {
          
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
        dateRes: this.reservForm.value.dateRes,
        ntel: this.reservForm.value.ntel,
        date: this.datede,
        status:this.reservForm.value.status,
        remarque:this.reservForm.value.remarque,
        nom:"Chokri Meddeb",
        code:this.cod
      })
      .subscribe((data) => {
        this.user = this.reservForm.value;
        
          this.calendService
            .updateCalendrierBydate(this.idApart, this.idCal,this.reservForm.value.status,
            this.jwt.decodeToken(localStorage.getItem('adminToken')!)._id,"admin",
            this.reservForm.value.firstName + ' ' + this.reservForm.value.lastName)
            .subscribe((data) => {
              
              
               window.location.reload();
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
        this.reserve1 = false;
        this.reserve = true;
        
      });
  }


  modif()
  {
    
    this.serviceRes.updateReserve(this.users[0].reser._id,{
    firstName: this.users[0].user.firstName,lastName: this.users[0].user.lastName,
    cin: this.users[0].user.cin,
    ntel: this.users[0].user.ntel,status:this.modifForm.value.status,
    remarque:this.modifForm.value.remarque
    }).subscribe((data) => {
      this.calendService
      .updateCalendrierBydate(this.idApart, this.idCal,this.modifForm.value.status,
        this.jwt.decodeToken(localStorage.getItem('adminToken')!)._id,"admin",
        this.users[0].user.firstName + ' ' + this.users[0].user.lastName)
      .subscribe((data) => {
        window.location.reload();
      });
    });
  }

  modifadmin()
  {
    
    this.serviceRes.updateReserve(this.user._id,this.modifFormAdmin.value).subscribe((data) => {
      this.calendService
      .updateCalendrierBydate(this.idApart, this.idCal,this.modifFormAdmin.value.status,
        this.jwt.decodeToken(localStorage.getItem('adminToken')!)._id,"admin",
        this.modifFormAdmin.value.firstName + ' ' + this.modifFormAdmin.value.lastName)
      .subscribe((data) => {
        
        window.location.reload();
      });
    });
  }

  supprim(id:any)

  {
    this.serviceRes.annulerReserv(id).subscribe((data) => {
      this.users=this.users.filter((elt)=>elt.reser._id!=id);
    });
  }
}
