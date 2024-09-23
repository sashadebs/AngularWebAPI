import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as PersonActions from '../store/person.actions';
import { NgForm } from '@angular/forms';
import * as AddressActions from '../../address/store/address.actions';


@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrl: './person-add.component.css'
})
export class PersonAddComponent {

  @ViewChild('personForm') personform: NgForm;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) {}

  onSubmit(){
    this.store.dispatch(new PersonActions.AddPerson(this.personform.value));
    this.personform.reset();
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['/']);
  }
}
