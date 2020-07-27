import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppState } from '../app.reducer';

import * as entradesSortidesActions from '../entrada-sortida/entrada-sortida.actions';
import { EntradaSortidaService } from '../services/entrada-sortida.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  usuariSubs: Subscription;
  entradaSortidaSubs: Subscription;

  constructor( private store: Store<AppState>,
               private entradaSortidaService: EntradaSortidaService
        ) { }

  ngOnInit(): void {
  this.usuariSubs = this.store.select('usuari')
        .pipe(
          filter( auth => auth.usuari != null )
        )
        .subscribe( ({usuari}) => {
         this.entradaSortidaSubs =  this.entradaSortidaService.iniciEntredesSortidesListener( usuari.uid )
                .subscribe( entradesSortidesFB => {
                  this.store.dispatch( entradesSortidesActions.setItems({ items: entradesSortidesFB }) )
                });
          });
  }
  ngOnDestroy() {
    this.usuariSubs.unsubscribe();
    this.entradaSortidaSubs.unsubscribe();
  }


}
