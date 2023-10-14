import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneComService {

  constructor(private http:HttpClient) { }
  API='http://localhost:8083/SpringMVC/servlet'
    //ajouter un lignecommande
    public registerLigneComm(code: string, id_commande: number, data: any) {
      const url = `${this.API}/add-Lig-comm/${code}/${id_commande}`;
      return this.http.post(url, data);
    }


    //afficher la liste des lignes commandes
    public getLignesCommandes(): Observable<any[]>
    { 
      return this.http.get<any[]>(this.API+'/afficher-tous-Lignes');
    }
    //supprimer une ligne commande
    public deleteLigneCommande(id: any)
    {
      return this.http.delete(`${this.API}/remove-Lig-comm/${id}`);
    }
}
