import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="http://localhost:5000/api/reservations/"
@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private http:HttpClient) { }

  createReserve(reserve:any):Observable<any>{
    return this.http.post<any>(url+"add",reserve);
  }
  getReserveByApartId(id:string):Observable<any>{
    return this.http.get<any>(url+"apart/"+id);
  }

  getReserveByApartIdAndDate(id:string,date:any):Observable<any>{
    return this.http.get<any>(url+"apart/"+id+"/date/"+date);
  }
  updateReserve(id:string){
    return this.http.put<any>(url+"update/"+id,{});
  }
  annulerReserv(id:string){
    return this.http.put<any>(url+"annuler/"+id,{});
  }

  getReserveByDate(date:any):Observable<any[]>{
    return this.http.get<any[]>(url+"get/reserByDate/"+date);
  }

}
