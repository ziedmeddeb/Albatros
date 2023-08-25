import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="https://albatros-backend.onrender.com/api/notifications/"
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }

  stockUserSub(sub:any):Observable<any>{
    return this.http.post<any>(url+"stock",sub);
  }
}
