import { Address } from "../address/address.model";

export class Person{
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public Addresses: Address[];


    constructor(fn: string, ln: string, mail: string){
        this.firstName = fn;
        this.lastName = ln;
        this.email = mail;

    }
}