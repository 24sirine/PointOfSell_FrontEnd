import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaissierService {

  constructor(private http:HttpClient) { }
  getCaissierData(email: any, mdp: any): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8083/SpringMVC/servlet/caissier/' + email + '/' + mdp);
  }
}
