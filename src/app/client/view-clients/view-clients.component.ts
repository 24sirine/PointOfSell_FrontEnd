import { Component } from '@angular/core';
import { ClientService } from 'src/app/client.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.css']
})
export class ViewClientsComponent {
   clientsDetails : any;
   selectedClient: any;
   clientToUpdate={
 id:1,
 name:"",
 adresse:"",
 mail:"",
 ville:"",
 region:"",
 codePostal:"",
 tel:""
   };
  constructor(private clientService:ClientService){ 
  }
  ngOnInit() {
    this.getClientDetails();
  }
 

  openPopUpDelete(client: any)
  {
    this.selectedClient = client;

const modelDiv2 =document.getElementById('myModalDelete');
if (modelDiv2 != null)
{modelDiv2.style.display='block';}

  }
  closePopUpDelete()
  {
    const modelDiv2 =document.getElementById('myModalDelete');
    if (modelDiv2 != null)
    {modelDiv2.style.display='none';}
  }

  getClientDetails()
  {
    this.clientService.getClients().subscribe(
      (resp)=>{
        console.log('response');
        this.clientsDetails = resp ;
      },
      (err)=>{
        console.log('error');
      }
    );
  }
  deleteclient()
  {
    if (this.selectedClient) {
      const clientId = this.selectedClient.id;
    this.clientService.deleteClient(clientId).subscribe(
      (resp)=>{
        console.log('response');
        this.getClientDetails();
        this.closePopUpDelete();

      },
      (err)=>{
        console.log('error');
      }
    );
  }}
  editclient(client: { id: number; name: string; adresse: string; mail: string; ville: string; region: string; codePostal: string; tel: string; })
  {
    this.clientToUpdate=client;
  }
  updateclient()
  {this.clientService.updateClient( this.clientToUpdate.id, this.clientToUpdate ).subscribe(
    (resp)=>{
      console.log('response');
     
    },
    (err)=>{
      console.log('error');
    }
  );
  
  }
}
