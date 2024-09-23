import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonComponent } from './person/person.component';
import { AddressComponent } from './address/address.component';
import { PersonAddComponent } from './person/person-add/person-add.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressAddComponent } from './address/address-add/address-add.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: "full"},
  {path: 'auth', component: AuthComponent},
  {path: 'person', component: PersonComponent, children:[
      {path: 'new', component: PersonAddComponent}, 
      {path: ':id', component: PersonEditComponent},
  ]}, 
  {path: 'address', component: AddressComponent, children:[
      {path: ':id', component: AddressListComponent},
      {path: ':id/new', component: AddressAddComponent},
      {path: ':id/:addressid', component: AddressAddComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
