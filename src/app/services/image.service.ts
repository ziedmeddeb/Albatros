import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url="https://albatros-backend.onrender.com/api/images/"
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  getImagebyApartId(id:string):Observable<any>{
    return this.http.get<any>(url+"apart/"+id);
  }
}
