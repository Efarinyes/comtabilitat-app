import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  
  nom = '';
  userSubs: Subscription;
  constructor( private authService: AuthService, 
               private router: Router,
               private store: Store<AppState> ) { }

  ngOnInit(): void {
     this.userSubs =  this.store.select('usuari')
       .pipe(
         filter( ({usuari}) => usuari != null )
       )
       .subscribe( ({ usuari }) => this.nom = usuari.nom );
  }
  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
  logout() {

    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

}
