import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressTableComponent } from './components/address-table/address-table.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressTableComponent,
    AddressFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule  {


}
