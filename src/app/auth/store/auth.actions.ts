import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Success';
export const AUTHENTICATE_FAIL = '[Auth] Fail';


export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { username: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      username: string;
      userID: number;
      redirect: boolean
    }
  ) {}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;

    constructor(public payload: string) {}
}


export type AuthActions = 
    | LoginStart 
    | AuthenticateSuccess
    | AuthenticateFail;
