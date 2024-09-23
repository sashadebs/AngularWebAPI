import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Address } from "./address.model";

@Injectable({providedIn: 'root'})
export class AddressService{

    constructor(
        private http: HttpClient,
    ) {}

    getAddresses(index: Number){
        return this.http.get<Address[]>(
            'http://localhost:5251/api/Person/' + index + '/Addresses'
          );  
    }

    addAddress(index: number, newAddress: Address){
        return this.http.post('http://localhost:5251/api/Person/' + index + '/address', 
            newAddress
        )
    }

    deleteAddress(personIndex: number, addressIndex: number){
        return this.http.delete(
            'http://localhost:5251/api/Person/' + personIndex + '/address/' + addressIndex
          )
    }

    updateAddress(personIndex: number, addressIndex: number, newAddress: Address){
    return this.http.put(
        'http://localhost:5251/api/Person/'+ personIndex + '/address/' + addressIndex, 
        newAddress
        )
    }
}