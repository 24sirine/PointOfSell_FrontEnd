import { Component } from '@angular/core';

import { ArticleService } from '../article.service';
import{LigneComService } from '../ligne-com.service';
import { combineLatest } from 'rxjs';
import { CommandeService } from '../commande.service';
import { MagasinService } from '../magasin.service';

@Component({
  selector: 'app-tab-invoice',
  templateUrl: './tab-article-invoice.component.html',
  styleUrls: ['./tab-article-invoice.component.css']
})
export class TabInvoiceComponent {
  dateCmd:any;
  montantPayee : number =0 ;
  selectedImage: string = '';
  rendu : number =0;
  montantinsuffisant :boolean =false ;
  paiementSuccess : boolean=false;
  magasinDetails: any[] = [];
  gain :number =0;
  clickCash(){ 
  this.rendu = this.montantPayee- (this.somme - (this.somme * (this.remiseTotale / 100))) ;
  if (this.rendu<0)
  {this.montantinsuffisant = true;
    this.rendu =0 ;
    this.montantPayee=0;
    setTimeout(() => {
      this.montantinsuffisant = false;
    }, 3000);
 }
  else 
  {this.paiementSuccess = true ;
    console.log((this.somme - (this.somme * (this.remiseTotale / 100))));
    this.comService.paiementCommande(this.numCommande,(this.somme - (this.somme * (this.remiseTotale / 100)))).subscribe(
      (response) => {
       console.log("paiement valide");
       console.log(response);
      },
      (error) => {
        console.log("erreur lors du paiement ");
      }
    );
  setTimeout(() => {
    this.paiementSuccess = false;
  }, 3000);}
}
  
  onImageClicked(imageName: string) {
   this.selectedImage=imageName;
    if (this.selectedImage === "cash") {
      this.comService.paiementCash(this.numCommande).subscribe(
        (response) => {
         console.log("methode de paiement par cash");
         console.log(this.rendu);
        
        },
        (error) => {
          console.log("erreur lors du paiement par cash");
        }
      );
    } else if (this.selectedImage === "cheque") {
      this.comService.paiementCheque(this.numCommande).subscribe(
        (response) => {
          console.log("methode de paiement par cheque");
        },
        (error) => {
          console.log("erreur lors du paiement par cheque");
        }
      );
    } else if (this.selectedImage === "mastercard") {
      this.comService.paiementMastercard(this.numCommande).subscribe(
        (response) => {
          console.log("methode de paiement par mastercard");
        },
        (error) => {
          console.log("erreur lors du paiement par mastercard");
        }
      );
    } else if (this.selectedImage === "visa") {
      this.comService.paiementVisa(this.numCommande).subscribe(
        (response) => {
          console.log("methode de paiement par visa");
        },
        (error) => {
          console.log("erreur lors du paiement par visa");
        }
      );
    } else if (this.selectedImage === "edinards") {
      this.comService.paiementEdinards(this.numCommande).subscribe(
        (response) => {
          console.log("methode de paiement par edinards");
        },
        (error) => {
          console.log("erreur lors du paiement par edinards");
        }
      );
    }
    console.log(this.selectedImage);
    this.cashSelected = (this.selectedImage === "cash");
  }
  cashSelected :boolean = false ;
  numCommande: number = 1;
  somme : number =0 ;
    remiseTotale : number=0;
   
    ;
  commandesDetailsOuvertes : any;
  commandesDetailsSuspendu : any;
  commandesDetailsValide : any;
  getCommandesOuvertes()
  {
    this.comService.getCommandesouvertes().subscribe(
      (resp)=>{
        console.log('response');
        this.commandesDetailsOuvertes  = resp ;
      },
      (err)=>{
        console.log('error');
      }
    );
  }
  getCommandesValide()
  {
    this.comService.getCommandesvalides().subscribe(
      (resp)=>{
        console.log('response');
        this.commandesDetailsValide  = resp ;
      },
      (err)=>{
        console.log('error');
      }
    );
  }
  getCommandesSuspendu()
  {
    this.comService.getCommandesSuspendu().subscribe(
      (resp)=>{
        console.log('response');
        this.commandesDetailsSuspendu  = resp ;
      },
      (err)=>{
        console.log('error');
      }
    );
  }

  constructor(private articleService: ArticleService  ,private magService :MagasinService,private comService :CommandeService ,private ligCom :LigneComService) {
  }

  inputValue : String = '';
articles: any[] = [];
input2value :string = '';
private isTableUpdated: boolean = false;
ngOnInit() {
  this.comService.afficherGainToday().subscribe(
    (resp)=>{
      console.log('response');
      this.gain  = resp ;
    },
    (err)=>{
      console.log('error');
    }
  );
  this.getCommandesOuvertes();
  this.getCommandesSuspendu();
  this.getCommandesValide();
  this.getMgasinsDetails();
  combineLatest([this.articleService.getcodeArticle$(), this.articleService.getqteArticle$()])
    .subscribe(([codeArticle, input2value]) => {
      if(codeArticle !== '' && input2value !== '' && !this.isTableUpdated) {
        this.inputValue = codeArticle;
        this.input2value = input2value;
        // Effectuez les opérations nécessaires avec les valeurs du code de l'article et de la quantité
        this.addArticleToTable(this.inputValue, this.input2value);
        this.isTableUpdated = true ;
      }
      else{this.isTableUpdated=false;}
    });

     // Récupérer le numéro de commande à partir du localStorage
    const storedCommand = localStorage.getItem('numCommande');
    this.numCommande = storedCommand ? parseInt(storedCommand) : 1;
    
}

 
addArticleToTable(code: String, qte: string) {
  const existingArticleIndex = this.articles.findIndex(article => article.code === code);

  if (existingArticleIndex !== -1) {
    // Article already exists, update its quantity and recalculate amount
    const existingArticle = this.articles[existingArticleIndex];
    existingArticle.qte = (parseInt(existingArticle.qte) + parseInt(qte)).toString();
    existingArticle.montant = (existingArticle.prixUnitaire * parseInt(existingArticle.qte)) -
                             ((existingArticle.prixUnitaire * parseInt(existingArticle.qte)) * (existingArticle.remise / 100));
    
    // Update total sum and remiseTotale
    this.somme += existingArticle.prixUnitaire * parseInt(qte);
    this.remiseTotale += existingArticle.remise;
  } else {
    // Article doesn't exist, create a new entry
    const newArticle = {
      code,
      prixUnitaire: 0,
      description: '',
      remise: 0,
      qte,
      montant: 0
    };

    this.articleService.getprixUnitaireArticle(code).subscribe(async (prix: any) => {
      newArticle.prixUnitaire = prix;

      // Wait for other service calls to complete
      await this.articleService.getdescriptionArticle(code).toPromise();
      await this.articleService.getRemiseArticle(code).toPromise();

      this.articleService.getdescriptionArticle(code).subscribe((res: string) => {
        newArticle.description = res;
      });
      this.articleService.getRemiseArticle(code).subscribe((remise: any) => {
        newArticle.remise = remise;
      });

      // Calculate the montant before remise
      newArticle.montant = (newArticle.prixUnitaire * parseInt(newArticle.qte)) -
                          ((newArticle.prixUnitaire * parseInt(newArticle.qte)) * (newArticle.remise / 100));

      // Add the article to the list
      this.articles.push(newArticle);
      this.somme += newArticle.montant;
      this.remiseTotale += newArticle.remise;
    });
  }
}

removeAllArticles() {
  this.articles.splice(0, this.articles.length);
}
removeLastArticle() {
  this.articles.pop();
}
resetPage() {
  // Incrémenter le numéro de commande
  this.numCommande++;

  // Sauvegarder le numéro de commande dans le localStorage
  localStorage.setItem('numCommande', this.numCommande.toString());

  // Recharger la page
  window.location.reload();
  this.NouvCommande();
}



//fonction qui permet d'ajouter une nouvelle commande
NouvCommande()
{// Créez une nouvelle instance de l'objet Date
const dateActuelle = new Date();

  const formData ={
    id_commande : this.numCommande ,
    datecmd: dateActuelle,
  
  }
  this.comService.ajouterCommande(formData).subscribe(
    (resp)=>{console.log("commande ajouté avec succés");},
    (error)=>{console.log("erreur lors de l'enregistrement de commande")}  );
}
//fonction qui permet de suspendre la commande
suspendreCommande()
{
  this.comService.updateStatusSuspendu(this.numCommande).subscribe(
    (response) => {
      console.log("Commande Suspendu avec succès");
      this.toggleAlertSuspendu();
      
    },
    (error) => {
      console.error("Erreur lors de la Suspension de la commande :", error);
    }
  ); 
}
//fonction qui permet d'ajouter les lignes de commandes lors de la validation
ValiderCommande() {
   this.comService.afficherDateCommande(this.numCommande).subscribe(
    (response) => {
     
      this.dateCmd=response;
    },
    (error) => {
      console.error("Erreur lors de l'affichage de date :", error);
    }
  );
  this.comService.updateStatusValidée(this.numCommande).subscribe(
    (response) => {
      console.log("Commande validée avec succès");
      this.toggleAlert();
    },
    (error) => {
      console.error("Erreur lors de la validation de la commande :", error);
    }
  );
  //const id_ass :number =0;
  // Parcours du tableau d'articles pour enregistrer chaque ligne de commande
  this.articles.forEach((article) => {
    // Préparez les données à envoyer dans la requête POST 
    const donnees = {
      qteCom: article.qte,
    };
   
    // Appelez le service 'registerLigneComm' en lui passant les paramètres nécessaires 
    this.ligCom.registerLigneComm(article.code, this.numCommande, donnees).subscribe(
      (response) => {
        console.log('Ligne de commande ajoutée avec succès pour le code', article.code, response);
       
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'ajout de la ligne de commande pour le code', article.code, error);
        
      }
    );
    this.articleService.changerQteStock(article.code,article.qte).subscribe(
      (response) => {
        console.log('stock changé avec succés ');
       
      },
      (error) => {
        console.error('erreur lors de changement de stock');
        
      }
    );
  });
}


showAlert: boolean = false;

// Function to toggle the visibility of the alert
toggleAlert() {
  this.showAlert = !this.showAlert;
  setTimeout(() => {
    this.showAlert = false;
  }, 3000);
}

showAlertSuspendu: boolean = false;

// Function to toggle the visibility of the alert
toggleAlertSuspendu() {
  this.showAlertSuspendu = !this.showAlertSuspendu;
  setTimeout(() => {
    this.showAlertSuspendu = false;
  }, 3000);
}



getMgasinsDetails()
{
  this.magService.getMagasins().subscribe(
    (resp)=>{
      console.log('response');
      this.magasinDetails = resp ;
    },
    (err)=>{
      console.log('error');
    }
  );
}





      };

     
    
    
    
    
    
    
    
    

    
  





