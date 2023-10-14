import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http:HttpClient) { }
  API='http://localhost:8083/SpringMVC/servlet'
  //ajouter une commande 
  public ajouterCommande(commandeData: any)
  {
    return this.http.post(this.API+'/add-commande',commandeData);
  }
  //afficher la liste des commandes
  public getCommandes(): Observable<any[]>
  { 
    return this.http.get<any[]>(this.API+'/afficher-tous-Commandes');
  }
//afficher la liste des commandes valides
public getCommandesvalides(): Observable<any[]>
{ 
  return this.http.get<any[]>(this.API+'/afficher-cmdValide');
}
//afficher la liste des ouvertes
public getCommandesouvertes(): Observable<any[]>
{ 
  return this.http.get<any[]>(this.API+'/afficher-cmdOuvertes');
}
//afficher la liste des Suspendu
public getCommandesSuspendu(): Observable<any[]>
{ 
  return this.http.get<any[]>(this.API+'/afficher-cmdSuspendu');
}

public afficherDateCommande(commande_id: number): Observable<Date> {
  return this.http.get<Date>(`${this.API}/afficher-date-commande/${commande_id}`);
}
  // Modifier le statut du commande : validée
  public updateStatusValidée(id?: number ){
    console.log('cmmd validée');
    console.log(id);
   return  this.http.put<any>(`${this.API}/valider-commande-status/${id}`,{});
  }
// Modifier le statut du commande : suspendu
public updateStatusSuspendu(id?: number ){

  return this.http.put<any>(`${this.API}/suspendre-commande-status/${id}`,{});
}

// Modifier la methode de paiement : visa
public paiementVisa(id?: number ){

  return this.http.put<any>(`${this.API}/paiement-visa/${id}`,{});
}

// Modifier la methode de paiement : mastercard
public paiementMastercard(id?: number ){

  return this.http.put<any>(`${this.API}/paiement-mastercard/${id}`,{});
}	
 // Modifier la methode de paiement : cheque
public paiementCheque(id?: number ){

  return this.http.put<any>(`${this.API}/paiement-cheque/${id}`,{});
}	
 // Modifier la methode de paiement : cash
 public paiementCash(id?: number ){

  return this.http.put<any>(`${this.API}/paiement-cash/${id}`,{});
}	
  // Modifier la methode de paiement :eDinards
  public paiementEdinards(id?: number ){

    return this.http.put<any>(`${this.API}/paiement-edinards/${id}`,{});
  }	
  //Modifier le champs de paiement 
  paiementCommande(commandeId: number, paiement: number) {
    return this.http.put<any>(`${this.API}/paiement/${commandeId}/${paiement}`,{}); 
  }

  //afficher le gain d'aujourdh'ui
public afficherGainToday():Observable<number>
{ 
  return this.http.get<number>(this.API+'/afficher-caisse-today');
}
}
