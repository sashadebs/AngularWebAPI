import { Action } from '@ngrx/store';
import { Person } from '../person.model';

export const FETCH_PERSONS = '[Person] Person Address';
export const SET_PERSON = '[Person] Set Person';
export const ADD_PERSON = '[Person] Add Person';
export const ADD_PERSON_SUCCESS = '[Person] Add Person Success';
export const DELETE_PERSON = '[Person] Delete Person';
export const DELETE_PERSON_SUCCESS = '[Person] Delete Person Success';
export const UPDATE_PERSON = '[Person] Update Person';
export const UPDATE_PERSON_SUCCESS = '[Person] Update Person Success';


export class FetchPersons implements Action {
  readonly type = FETCH_PERSONS;
}

export class SetPerson implements Action {
  readonly type = SET_PERSON;

  constructor(public payload: Person[]) {}
}

export class AddPerson implements Action {
  readonly type = ADD_PERSON;

  constructor(public payload: Person) {}
}

export class AddPersonSuccess implements Action {
  readonly type = ADD_PERSON_SUCCESS;

  constructor(public payload: Person) {}
}

export class UpdatePerson implements Action {
  readonly type = UPDATE_PERSON;

  constructor(public payload: {index: number, newPerson: Person}) {}
}

export class UpdatePersonSuccess implements Action {
  readonly type = UPDATE_PERSON_SUCCESS;
  
  constructor(public payload: {index: number, newPerson: Person}) {}
}

export class DeletePerson implements Action {
  readonly type = DELETE_PERSON;

  constructor(public payload: number) {}
}
export class DeletePersonSuccess implements Action {
  readonly type = DELETE_PERSON_SUCCESS;

  constructor(public payload: number) {}
}


export type PersonActions = 
| FetchPersons 
| SetPerson 
| AddPerson
| AddPersonSuccess
| UpdatePerson
| UpdatePersonSuccess
| DeletePerson
| DeletePersonSuccess
;
