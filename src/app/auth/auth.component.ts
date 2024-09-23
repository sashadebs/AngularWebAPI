import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { AuthErrorService } from './auth-error.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  error: string = null;

  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private authErrorService: AuthErrorService
  ){
    this.authErrorService.requestFailed$.subscribe(
      (errorRes) => {
        this.error = errorRes;
    })
  }
  //isLoginMode = true;

  // onSwitchMode(){
  //   this.isLoginMode = !this.isLoginMode;
  // }

  onSubmit(form: NgForm){
    this.store.dispatch(new AuthActions.LoginStart({
      username: form.value.username,
      password: form.value.password
    }))
    form.reset();
  }

}
