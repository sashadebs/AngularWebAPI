import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorService implements OnDestroy{

  requestFailed$ = new Subject<string>();
  
  constructor() { }

  onRequestFailed(error: string) {
    this.requestFailed$.next(error);
  }

  ngOnDestroy(): void {
    this.requestFailed$.complete();
  }
  
}
