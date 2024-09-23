import { Person } from '../person.model';
import * as PersonActions from '../store/person.actions';

export interface State {
  people: Person[];
}

const initialState: State = {
  people: [],
};

export function PersonReducer(
  state = initialState,
  action: PersonActions.PersonActions
) {
    switch(action.type){
        case PersonActions.SET_PERSON:
            return{
               ...state,
               people: [...action.payload], 
            };
        case PersonActions.ADD_PERSON_SUCCESS: 
            return{
              ...state,
               people: [...state.people, action.payload], 
            };
        case PersonActions.UPDATE_PERSON_SUCCESS:
            const localIndex = state.people.findIndex(
              (person) => {
                return person.id === action.payload.index;
              });
            const updatedPerson = {
              ...state.people[localIndex],
              ...action.payload.newPerson
            };
            const updatedPeople = [...state.people];
            updatedPeople[localIndex] = updatedPerson;
            return{
              ...state,
              people: updatedPeople, 
            };
        case PersonActions.DELETE_PERSON_SUCCESS:
            return{
              ...state,
              people: state.people.filter((person, index) => {
                return person.id !== action.payload;
              })
            };
        default:
            return state;
    }
}
