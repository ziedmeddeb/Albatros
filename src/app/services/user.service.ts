import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="http://localhost:5000/api/users/"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(user:any):Observable<any>{
    return this.http.post<any>(url+"create",user);
  }

  login(user:any):Observable<any>{
    return this.http.post<any>(url+"login",user);
  }

  updateUser(id:string,data:any):Observable<any>{
    return this.http.put<any>(url+"update/"+id,data);
  }

  getUserById(id:string):Observable<any>{
    return this.http.get<any>(url+"get/"+id);
  }

  changePass(id:string,data:any):Observable<any>{
    return this.http.put<any>(url+"changePass/"+id,data);
  }
}
