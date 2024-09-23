import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as PersonActions from './person.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { Person } from '../person.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { PersonService } from '../person.service'; 


@Injectable()
export class PersonEffects {
  actions$ = inject(Actions);

  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private personService: PersonService
  ) {}

  fetchpersons = createEffect( () =>
    this.actions$.pipe(
        ofType(PersonActions.FETCH_PERSONS),
        exhaustMap(() => {
            return this.personService.getPeople()
            .pipe(
                  map((people) => {
                    //console.log('here');
                    const mappedPeople: Person[] = people.map((people) => {
                      return {
                        ...people,
                        Addresses: people.Addresses ? people.Addresses : [],
                      };
                    });
                    return new PersonActions.SetPerson(mappedPeople);
                  }),
                  catchError(error => { console.log(error); return of(error); })
                )}
        )
      )
  );


  updatePerson = createEffect(() =>
    this.actions$.pipe(
        ofType(PersonActions.UPDATE_PERSON),
        exhaustMap( (personState) => {
            return this.personService.updatePerson(
              personState.payload.index,
              personState.payload.newPerson
            ) 
            .pipe(map( () => {
                return new PersonActions.UpdatePersonSuccess({
                  index: personState.payload.index,
                  newPerson: personState.payload.newPerson
                });
              })
            );
        })
    ));

    addPerson = createEffect(() =>
      this.actions$.pipe(
          ofType(PersonActions.ADD_PERSON),
          exhaustMap( (personState) => {
              return this.personService.addPerson(personState.payload)
              .pipe(map( (person: Person) => {
                // const newlyAddedPerson: Person = {
                //   firstName: personState.payload.firstName,
                //   lastName:  personState.payload.lastName,
                //   email:  personState.payload.email,
                //   id:  0,
                //   Addresses: []
                // }
                return new PersonActions.AddPersonSuccess(person);
              }));
          })
      ));

      deletePerson = createEffect(() =>
        this.actions$.pipe(
            ofType(PersonActions.DELETE_PERSON),
            exhaustMap( (personState) => {
                return this.personService.deletePerson(personState.payload)
                .pipe(map( () => {
                  return new PersonActions.DeletePersonSuccess(personState.payload);
                }));
            })
        )
      );

}
