import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as AddressActions from "./address.actions";
import { catchError, exhaustMap, map, of, switchMap, throwError } from "rxjs";
import { Address } from "../address.model";
import { AddressService } from "../address.service";



@Injectable()
export class AddressEffects {
  actions$ = inject(Actions);

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private addressService: AddressService
  ) {}

 
  fetchAddresses = createEffect( () => 
    this.actions$.pipe(
        ofType(AddressActions.FETCH_ADDRESSES),
        switchMap( (addressState) => {
          //console.log("hello");
          return this.addressService.getAddresses(addressState.payload); 
          // return this.http.get<Address[]>(
          //   'http://localhost:5251/api/Person/' + addressState.payload + '/Addresses'
          // ); 
        }),
        map((addresses) => {
            return new AddressActions.SetAddresses(addresses);
        })
    )
)


addAddress = createEffect( () => 
    this.actions$.pipe(
        ofType(AddressActions.ADD_ADDRESS),
        exhaustMap( (addressState) => {
            return this.addressService.addAddress(
              addressState.payload.index,
              addressState.payload.newAddress
            )
            .pipe( map( () => {
                return new AddressActions.AddAddressSuccess({
                    index: addressState.payload.index,
                    newAddress: addressState.payload.newAddress
                });
            }));
        })
    )
)

deleteAddress = createEffect( () => 
    this.actions$.pipe(
        ofType(AddressActions.DELETE_ADDRESS),
        exhaustMap( (addressState) => {
            return this.addressService.deleteAddress(
              addressState.payload.personID,
              addressState.payload.addressID
            )
            .pipe(map( () => {
              return new AddressActions.DeleteAddressSuccess({
                personID: addressState.payload.personID,
                addressID: addressState.payload.addressID
              });
            }));
        })
    )
);

updateAddress = createEffect(() =>
    this.actions$.pipe(
        ofType(AddressActions.UPDATE_ADDRESS),
        exhaustMap( (addressState) => {
            return this.addressService.updateAddress(
              addressState.payload.personID,
              addressState.payload.addressID,
              addressState.payload.newAddress
            )
            .pipe(map( () => {
                return new AddressActions.UpdateAddressSuccess({
                  personID: addressState.payload.personID,
                  addressID: addressState.payload.addressID,
                  newAddress: addressState.payload.newAddress
                });
              })
            );
        })
    ));

}