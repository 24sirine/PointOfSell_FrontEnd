import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ArticleService {

    constructor(private http:HttpClient) { }
  
    API='http://localhost:8083/SpringMVC/servlet'
   codeArticle: String ='';
   qteArticle: String ='';
 
     private codeArticleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
     private qteArticleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
   
     getcodeArticle$(): Observable<string> {
       return this.codeArticleSubject.asObservable();
     }
   
     setCodeArticle(code: string) {
      this.codeArticleSubject.next(code);
      
    }
    setqteArticle( qte: string) {
 
      this.qteArticleSubject.next(qte);
    }
  
getqteArticle$(): Observable<string> {
  return this.qteArticleSubject.asObservable();
}

   
    //afficher la liste des articles
    public getArticles(): Observable<any[]>
    { 
      return this.http.get<any[]>(this.API+'/afficher-tous-Articles');
    }
    //cette méthode retourne libéllé de l'article à partir de son code
    public getLibelleArticle(code: String) {
      
      return this.http.get(`${this.API}/afficherLibelleArticle/${code}`, { responseType: 'text' });
 
    }
    //cette méthode retourne la qte de stock de l'article à partir de son code
    public getStockArticle(code :String)
    {
      return this.http.get( `${this.API}/afficherStockArticle/${code}`)  ;
 
    }
       //cette méthode retourne l'url de l'image de l'article à partir de son code
       public getUrlImgArticle(code: String) {
      
        return this.http.get(`${this.API}/afficherImgArticle/${code}`, { responseType: 'text' });
   
      }

      //cette méthode retourne la description de l'article à partir de son code
      public getdescriptionArticle(code: String) {
      
        return this.http.get(`${this.API}/afficherDescription/${code}`, { responseType: 'text' });
   
      }
      
      //cette méthode retourne le prix unitaire de l'article à partir de son code
      public getprixUnitaireArticle(code: String) {
      console.log('appel service');
        return this.http.get(`${this.API}/afficherPrix/${code}`);
   
      }
      //cette méthode retourne la remise de l'article à partir de son code
      public getRemiseArticle(code: String) {
      
        return this.http.get(`${this.API}/afficherRemise/${code}`);
   
      }

      //Modifier le champs de qteStock
  changerQteStock(code: String, qteEnleve: number) {
    return this.http.put<any>(`${this.API}/changer_qtedispo/${code}/${qteEnleve}`,{}); 
  }
}