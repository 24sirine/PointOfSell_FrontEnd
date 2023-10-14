import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  API='http://localhost:8083/SpringMVC/servlet'
  //ajouter un client 
  public registerClient(clientData: any)
  {
    return this.http.post(this.API+'/add-client',clientData);
  }
  //afficher la liste des clients
  public getClients(): Observable<any[]>
  { 
    return this.http.get<any[]>(this.API+'/afficher-tous-clients');
  }
  //supprimer un client
  public deleteClient(id: any)
  {
    return this.http.delete(`${this.API}/remove-client/${id}`);
  }
 // modifier un client
 public updateClient(id?: number ,client?: any): Observable<any>{
  return this.http.put<any>(`${this.API}/modify-client/${id}`, client)
}
}
