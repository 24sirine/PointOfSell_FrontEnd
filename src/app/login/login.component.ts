import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaissierService } from '../caissier.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{




  model: any = {}
  getData: boolean = false;
   constructor(private caissierservice :CaissierService ,private router :Router ) {}
 
   ngOnInit() {
   }
   ngOnDestroy() {
   }
 
   login(){
    
     var email = this.model.email;
     var mdp = this.model.mdp;
     
 
     this.caissierservice.getCaissierData(email,mdp).subscribe((res:boolean)=>{
       this.getData = res;
       if(this.getData == true){
         console.log("hello");
         this.router.navigate(["/home"]);
       } 
       else {
         alert("coordonnées invalide");
        console.log("erreur");
       }
     });
   
 
 }




}
