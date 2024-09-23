import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Address } from '../address.model';
import * as fromApp from '../../store/app.reducer';
import { map, Subscription } from 'rxjs';
import * as AddressActions from '../store/address.actions';


@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent implements OnInit, OnDestroy {

  addresses: Address[];
  id: number;
  storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router,
  ){}

  onNewAddress(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      
      this.store.dispatch(new AddressActions.FetchAddresses(this.id));

      this.storeSub = this.store
        .select('address')
        .pipe(map(addressState => addressState.addresses))
        .subscribe( (address: Address[]) => {
          this.addresses = address;
      });
     });
  }


  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }
}
