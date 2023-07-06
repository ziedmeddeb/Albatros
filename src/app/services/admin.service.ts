import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="https://albatros-backend.onrender.com/api/admin/"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  login(admin:any):Observable<any>{
    return this.http.post<any>(url+"login",admin);
  }
}
