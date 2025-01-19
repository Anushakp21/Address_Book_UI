import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressTableComponent } from './components/address-table/address-table.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

const routes: Routes = [
  {path:'address-table',component:AddressTableComponent},
  {path:'',redirectTo:'address-table',pathMatch:'full'},
  {path:'address-form',component:AddressFormComponent},
  { path: 'address-form/:id', component: AddressFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
