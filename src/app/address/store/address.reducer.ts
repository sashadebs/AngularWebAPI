import { Address } from '../address.model';
import * as AddressActions from '../store/address.actions';

export interface State {
  addresses: Address[];
}

const initialState: State = {
  addresses: [],
};

export function AddressReducer(
  state = initialState,
  action: AddressActions.AddressActions
) {
    switch(action.type){
      case AddressActions.SET_ADDRESSES:
        return {
          ...state,
          addresses: [...action.payload],
        };
      case AddressActions.ADD_ADDRESS_SUCCESS:
        return{
          ...state,
          addresses: [...state.addresses, action.payload.newAddress]
        };
      case AddressActions.DELETE_ADDRESS_SUCCESS:
        return{
          ...state,
          addresses: state.addresses.filter((address, index) => {
            return address.id !== action.payload.addressID;
          })
        };
      case AddressActions.UPDATE_ADDRESS_SUCCESS:
        const localIndex = state.addresses.findIndex(
          (address) => {
            return address.id === action.payload.addressID
          });
        const updatedAddress = {
          ...state.addresses[localIndex],
          ...action.payload.newAddress
        };
        const updatedAddresses = [...state.addresses];
        updatedAddresses[localIndex] = updatedAddress;
        return{
          ...state,
          addresses: updatedAddresses,
        };
      default:
        return state;
    }
}
