import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabInvoiceComponent } from './tab-article-Invoice/tab-article-invoice.component';
import { TabHeaderArticleComponent } from './tab-header-article/tab-header-article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { ViewClientsComponent } from './client/view-clients/view-clients.component';
import { AddClientsComponent } from './client/add-clients/add-clients.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewArticlesComponent } from './article/view-articles/view-articles.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    TabInvoiceComponent,
    TabHeaderArticleComponent,
  
    ViewClientsComponent,
    AddClientsComponent,
    ViewArticlesComponent,
    LoginComponent,
    HomeComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule

  ],
  providers: [TabInvoiceComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
