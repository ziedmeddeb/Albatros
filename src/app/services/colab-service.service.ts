import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="https://albatros-backend.onrender.com/api/colabs/"
@Injectable({
  providedIn: 'root'
})
export class ColabServiceService {

  constructor(private http:HttpClient) { }

  getColabById(id:string):Observable<any>{
    return this.http.get<any>(url+"get/"+id);
  }

  register(data:any):Observable<any>{
    return this.http.post<any>(url+"register",data);
  }   

  login(data:any):Observable<any>{
    return this.http.post<any>(url+"login",data);
  }

}
