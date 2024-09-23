import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Person } from '../person.model';
import * as fromApp from '../../store/app.reducer';
import * as PersonActions from '../store/person.actions';


@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrl: './person-edit.component.css',
})
export class PersonEditComponent implements OnInit, OnDestroy {

  @ViewChild('personForm') personform: NgForm;
  id: number;
  editMode = false;
  private storeSub: Subscription;

  personid=0;
  firstName='';
  lastName='';
  mail='';
  Addresses=[];
  

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
          
        this.storeSub = this.store.select('person')
        .pipe(map( (personState) => {
          return personState.people.find((person, index) => {
            return personState.people[index].id === this.id;
          });
        }))
        .subscribe( person => {
          this.personid = this.id
          this.firstName = person.firstName;
          this.lastName = person.lastName;
          this.mail = person.email;
          this.Addresses = person.Addresses; 
        });
    });
  }

  onSubmit() {
    if(this.editMode){
      this.store.dispatch(new PersonActions.UpdatePerson(
        {index: this.id,
        newPerson: this.personform.value}
      ))

    } 
    this.personform.reset();
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }


}
