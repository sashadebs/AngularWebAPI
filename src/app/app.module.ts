import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { AddressComponent } from './address/address.component';
import { HeaderComponent } from './header/header.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { PersonEffects } from './person/store/person.effects'
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { CommonModule } from '@angular/common';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddressDetailsComponent } from './address/address-list/address-details/address-details.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { PersonAddComponent } from './person/person-add/person-add.component';
import { AddressAddComponent } from './address/address-add/address-add.component';
import { AddressEffects } from './address/store/address.effects';
import { PersonService } from './person/person.service';
import { TokenService } from './service-token.service';
import { InterceptorService } from './interceptor.service';
import { AuthComponent } from './auth/auth.component';
import { AuthEffects } from './auth/store/auth.effects';



export function serviceToken(tokenservice: TokenService){
  return () => tokenservice.init();
}



@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    AddressComponent,
    HeaderComponent,
    PersonEditComponent,
    AddressDetailsComponent,
    AddressListComponent,
    PersonAddComponent,
    AddressAddComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([PersonEffects, AddressEffects, AuthEffects]),
    FormsModule,
    CommonModule,
    StoreDevtoolsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      name: "person-address",
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true 
    },
    {
      provide: APP_INITIALIZER,
      useFactory: serviceToken,
      deps: [TokenService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
