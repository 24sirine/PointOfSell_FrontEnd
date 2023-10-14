import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionEnum } from 'src/app/RegionEnum';


import { ClientService } from 'src/app/client.service';


@Component({
  selector: 'app-add-clients',
  templateUrl: './add-clients.component.html',
  styleUrls: ['./add-clients.component.css']
})
export class AddClientsComponent {
  
  
  
  
  isLinear = true;
  firstFormGroup: FormGroup = new FormGroup({});;
  secondFormGroup: FormGroup = new FormGroup({});;
  
 
  constructor(private _formBuilder: FormBuilder, private clientService: ClientService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      mail: ['', Validators.required],
      tel: ['', Validators.required],
      imgClient :['']
    });
    this.secondFormGroup = this._formBuilder.group({
      region: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      codePostal :['',Validators.required]
    });
  }
  
 
  submit() {
    const formData = {
      name: this.firstFormGroup.value.name,
      mail: this.firstFormGroup.value.mail,
      tel: this.firstFormGroup.value.tel,
      imgClient: this.firstFormGroup.value.imgClient,
      region: this.secondFormGroup.value.region as RegionEnum,
      adresse: this.secondFormGroup.value.adresse,
      ville: this.secondFormGroup.value.ville,
      codePostal: this.secondFormGroup.value.codePostal
    };
  
    this.clientService.registerClient(formData).subscribe(
      (response) => {
        console.log('Client enregistré avec succès !');
        // Gérez la réponse du backend en cas de succès
       
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du client : ', error);
        // Gérez les erreurs en cas d'échec
      }
    );
  }
  
}
