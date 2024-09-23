import { Action } from "@ngrx/store";
import { Address } from "../address.model";


export const FETCH_ADDRESSES = '[Address] Fetch Addresses';
export const SET_ADDRESSES = '[Address] Set Addresses';
export const ADD_ADDRESS = '[Address] Add Address';
export const ADD_ADDRESS_SUCCESS = '[Address] Add Address Success';
export const DELETE_ADDRESS = '[Address] Delete Address';
export const DELETE_ADDRESS_SUCCESS = '[Address] Delete Address Success';
export const UPDATE_ADDRESS = '[Address] Update Address';
export const UPDATE_ADDRESS_SUCCESS = '[Address] Update Address Success';



export class FetchAddresses implements Action{
    readonly type = FETCH_ADDRESSES;

    constructor(public payload: number){}
}
export class SetAddresses implements Action{
    readonly type = SET_ADDRESSES;

    constructor(public payload: Address[]){}
}

export class AddAddress implements Action{
    readonly type = ADD_ADDRESS;

    constructor(public payload: {index: number, newAddress: Address}){}
}
export class AddAddressSuccess implements Action{
    readonly type = ADD_ADDRESS_SUCCESS;

    constructor(public payload: {index: number, newAddress: Address}){}
}

export class DeleteAddress implements Action{
    readonly type = DELETE_ADDRESS;

    constructor(public payload:{personID: number, addressID: number}){}
}
export class DeleteAddressSuccess implements Action{
    readonly type = DELETE_ADDRESS_SUCCESS;

    constructor(public payload:{personID: number, addressID: number}){}
}

export class UpdateAddress implements Action{
    readonly type = UPDATE_ADDRESS;

    constructor(public payload:{personID: number, addressID: number, newAddress: Address}){}
}
export class UpdateAddressSuccess implements Action{
    readonly type = UPDATE_ADDRESS_SUCCESS;

    constructor(public payload:{personID: number, addressID: number, newAddress: Address}){}
}





export type AddressActions = 
    | FetchAddresses 
    | SetAddresses
    | AddAddress
    | AddAddressSuccess
    | DeleteAddress
    | DeleteAddressSuccess
    | UpdateAddress
    | UpdateAddressSuccess
    ;