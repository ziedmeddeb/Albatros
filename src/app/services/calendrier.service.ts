import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendrier } from '../entities/calendrier';
const url="https://albatros-backend.onrender.com/api/calendrier/"
@Injectable({
  providedIn: 'root'
})
export class CalendrierService {

  constructor(private http:HttpClient) { }

  getCalendrierByApartId(id:string):Observable<any>{
    return this.http.get<any>(url+"get/"+id);
  }

  addCalendrier(appartement:string):Observable<any>{
    return this.http.post<any>(url+"create",appartement);
  }

  updateCalendrier(id:string,data:any):Observable<any>{
    return this.http.put<any>(url+"update/"+id,data);
  }

  updateCalendrierBydate(idApart:string,idDate:string,status:string,persId:any,role:any,nom:string){
    return this.http.put<any>(url+"update/"+idApart+"/"+idDate+"/"+status+"/"+persId+"/"+role,{nom:nom});
  }

  updateCalendrierBydate2(idApart:string,idDate:string,status:string){
    return this.http.put<any>(url+"update2/"+idApart+"/"+idDate+"/"+status,{});
  }

  

  
}
