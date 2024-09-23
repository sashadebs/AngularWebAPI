import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthActions from '../store/auth.actions';
import { catchError, map, of, switchMap, tap } from "rxjs";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { AuthErrorService } from "../auth-error.service";


export interface AuthResponseData {
    id: number;
    username: string;
    password: string;
}


@Injectable()
export class AuthEffects{

    actions$ = inject(Actions);
    constructor(
        private http: HttpClient,
        private router: Router,
        private authErrorService: AuthErrorService
    ){}

    authLogin = createEffect( () => 
        this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap( (authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>('http://localhost:5251/api/User/Login', 
                    { 
                        username: authData.payload.username,
                        password: authData.payload.password
                    }
                ).pipe(map( (resData: AuthResponseData) => {
                    const user = new User(resData.username,  resData.id);
                    return new AuthActions.AuthenticateSuccess({
                        userID: user.id,
                        username: user.username,
                        redirect: true
                    });
                }), catchError( (errorRes) => {
                    let errorMessage = 'Unknown error occured'                    
                    if(errorRes.status=='400'){
                        errorMessage = errorRes.error.error[0]
                    } else if (errorRes.status=='404'){
                        errorMessage = errorRes.error.error.errors[0].errorMessage
                    } 
                    //this.authErrorService.onRequestFailed(errorMessage);
                    //return of({type: 'noop'});
                    return of(new AuthActions.AuthenticateFail(errorMessage));
                })
            );
            })
        )
    );

    authFail = createEffect( () => 
        this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_FAIL),
            tap( (authData) => {
                this.authErrorService.onRequestFailed(authData.payload);
            })
        ), { dispatch: false }
    );

    authredirect = createEffect( () => 
        this.actions$.pipe(
            ofType(AuthActions.AUTHENTICATE_SUCCESS),
            tap( (authData: AuthActions.AuthenticateSuccess) => {
                if(authData.payload.redirect){
                    this.router.navigate(['/person']);
                }   
            })
        ), { dispatch: false }
    );

}