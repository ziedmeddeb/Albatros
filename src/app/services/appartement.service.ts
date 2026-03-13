import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appartements } from '../entities/appartements';
const url="http://localhost:5000/api/appartements/"
@Injectable({
  providedIn: 'root'
})
export class AppartementService {

  constructor(private http:HttpClient) { }

  getAppartements():Observable<Appartements[]>{
    return this.http.get<Appartements[]>(url+"all");
  }

  filterApart(categ:any):Observable<Appartements[]>{
    return this.http.get<Appartements[]>(url+"filter/"+categ);
  }

  getApartById(id:any):Observable<Appartements>{
    return this.http.get<Appartements>(url+id);
  }

}
