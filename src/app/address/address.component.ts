import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map, Subscription } from 'rxjs';
import { Address } from './address.model';
import * as AddressActions from './store/address.actions';
import * as PersonActions from '../person/store/person.actions';
import { Person } from '../person/person.model';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit {

  people: Person[];
  subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.subscription = this.store
    .select('person')
    .pipe(map(personState => personState.people))
    .subscribe( (people: Person[]) => {
      this.people = people;
    });
  }

  onNavigate(index: number){
    this.router.navigate([this.people[index].id], {relativeTo: this.route});
  }
}
