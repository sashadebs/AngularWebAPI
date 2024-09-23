import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as PersonActions from '../person/store/person.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor( 
    private store: Store<fromApp.AppState>,
    public router: Router,
  ){}

  isAuthenticated = false;
  private userSub: Subscription;


  ngOnInit(): void {
    this.userSub = this.store
    .select('auth')
    .pipe(map(authState => authState.user))
    .subscribe( user => {
        this.isAuthenticated = user ? true : false;;
    });
}

  onAdd(){
    this.router.navigate(['person/new']);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
}
}
