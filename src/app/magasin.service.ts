import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  constructor(private http:HttpClient) { }

  API='http://localhost:8083/SpringMVC/servlet'
   //afficher la liste des Magasins
   public getMagasins(): Observable<any[]>
   { 
     return this.http.get<any[]>(this.API+'/afficher-tous-Magasins');
   }
}
