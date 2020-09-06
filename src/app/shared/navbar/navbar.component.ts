import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  nom: string;
  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('usuari')
        .pipe(
          filter( auth => auth.usuari != null )
        )
        .subscribe( auth => this.nom = auth.usuari.nom );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
