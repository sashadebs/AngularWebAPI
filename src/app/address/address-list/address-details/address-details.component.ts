import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import { Address } from '../../address.model';
import * as AddressActions from '../../store/address.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';


@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.css'
})
export class AddressDetailsComponent implements OnInit{

  @Input() index: number;
  @Input() address: Address; 
  private personid: number; 


  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.personid = +params['id'];
    });

  }

  onDeleteAddress(index: number){
    this.store.dispatch(new AddressActions.DeleteAddress({personID: this.personid, addressID: index}));

  }


  
}
