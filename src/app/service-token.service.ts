import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token='';
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId,
  ) {}

  init() {

    if(isPlatformBrowser(this.platformId)){
      return this.http.get(
        'http://localhost:5251/api/Person/token', 
        {responseType: 'text'})
        .pipe(tap( (token) => {
          this.token = token;
          sessionStorage.setItem("authorization", token);
      }));
  }
  }

  getToken(){
    return this.token;
  }

 
}
