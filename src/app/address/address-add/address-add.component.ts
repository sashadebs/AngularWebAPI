import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AddressActions from '../store/address.actions';



@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrl: './address-add.component.css'
})
export class AddressAddComponent implements OnInit, OnDestroy {

  @ViewChild('addressForm') addressform: NgForm;
  private id: number;
  private addressid: number;
  editMode = false;
  private storeSub: Subscription;

  addressCountry = '';
  addressCity = '';
  addressStreet = '';
  addressPhone = '';


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.addressid = +params['addressid'];
      this.editMode = params['addressid'] != null;
    })

    this.storeSub = this.store.select('address')
    .pipe(map( (addressState) => {
      return addressState.addresses.find((address, index) => {
        return address.id === this.addressid;
      });
    }))
    .subscribe( address => {
      this.addressCountry = address.country;
      this.addressCity = address.city;
      this.addressStreet = address.street;
      this.addressPhone = address.phone;
    });

  }

  onSubmit(){
    if(this.editMode){
      this.store.dispatch(new AddressActions.UpdateAddress({
        personID: this.id,
        addressID: this.addressid,
        newAddress: this.addressform.value
      }))
    } else {
      this.store.dispatch(new AddressActions.AddAddress({
        index: this.id, 
        newAddress: this.addressform.value
      }));
    }
    this.addressform.reset();
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
  }


}
