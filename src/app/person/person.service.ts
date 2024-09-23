import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Person } from "./person.model";


@Injectable({ providedIn: 'root' })
export class PersonService{

    constructor(
        private http: HttpClient,
    ) {}

    getPeople(){
        return this.http.get<Person[]>("http://localhost:5251/api/Person");
    }

    updatePerson(index: number, newPerson: Person){
        return this.http.put(
            'http://localhost:5251/api/Person/' + index, 
              newPerson 
          );
    }

    deletePerson(index: number){
        return this.http.delete(
            'http://localhost:5251/api/Person/' + index
          )
    }

    addPerson(newPerson: Person){
        return this.http.post(
            'http://localhost:5251/api/Person/new', 
              newPerson
          )
    }

}