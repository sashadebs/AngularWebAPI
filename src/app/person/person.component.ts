import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import { map, Subscription } from 'rxjs';
import { Person } from './person.model';
import * as PersonActions from './store/person.actions';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit, OnDestroy {

  people: Person[];
  subscription: Subscription;
  pID: number;
  flag = false;
  

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.store.dispatch(new PersonActions.FetchPersons());
    
    this.subscription = this.store
    .select('person')
    .pipe(map(personState => personState.people))
    .subscribe( (people: Person[]) => {
      this.people = people;
    });
  }


   ngOnDestroy(): void {
     this.subscription.unsubscribe();
   }

   onNavigate(index: number) {
    this.router.navigate([this.people[index].id], {relativeTo: this.route});
   }

   onDeletePerson(index: number){ 
      this.store.dispatch(new PersonActions.DeletePerson(this.people[index].id))
   }
}
