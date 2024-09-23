import { User } from "../user.model";
import * as AuthActions from "./auth.actions";


export interface State{
    user: User;
    authError: string
}

const initialState: State = {
    user: null,
    authError: null
}

export function AuthReducer(
    state: State = initialState,
    action: AuthActions.AuthActions
){
    switch(action.type){
        case AuthActions.LOGIN_START:
            return{
                ...state,
                authError: null
            };
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(
                action.payload.username,
                action.payload.userID
            )
            return{
                ...state,
                authError: null,
                user: user
            }
        case AuthActions.AUTHENTICATE_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload
            };
        default:
            return state;
    }
}