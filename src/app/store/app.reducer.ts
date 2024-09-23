import * as fromPerson from '../person/store/person.reducer';
import * as fromAddress from '../address/store/address.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';



export interface AppState{
    person: fromPerson.State;
    address: fromAddress.State;
    auth: fromAuth.State
}


export const appReducer: ActionReducerMap<AppState> = {
    person: fromPerson.PersonReducer,
    address: fromAddress.AddressReducer,
    auth: fromAuth.AuthReducer
}