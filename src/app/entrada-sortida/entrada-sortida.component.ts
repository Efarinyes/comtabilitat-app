import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { EntradaSortida } from '../models/entrada-sortida.model';
import { EntradaSortidaService } from '../services/entrada-sortida.service';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as uiAction from '../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-entrada-sortida',
  templateUrl: './entrada-sortida.component.html',
  styles: [
  ]
})
export class EntradaSortidaComponent implements OnInit, OnDestroy {

  ingresForm: FormGroup;
  tipus = 'ingres';
  carregant = false;
  loadingSubs: Subscription;

  constructor( private fb: FormBuilder,
               private entradaSortidaService: EntradaSortidaService,

               private store: Store<AppState>
              ) { }

  ngOnInit(): void {

  this.loadingSubs =  this.store.select('ui').subscribe( ui => this.carregant = ui.isLoading );

  this.ingresForm = this.fb.group({
    descripcio: ['', Validators.required ],
    quantitat: ['', Validators.required ],

    });
  }
ngOnDestroy() {
  this.loadingSubs.unsubscribe();
}


  guardar() {

    if (this.ingresForm.invalid) { return; }

    this.store.dispatch( uiAction.isLoading() );
    const { descripcio, quantitat } = this.ingresForm.value;


    const entradaSortida = new EntradaSortida( descripcio, quantitat, this.tipus );

    this.entradaSortidaService.crearEntradaSortida( entradaSortida )
        .then( () => {
          this.ingresForm.reset();
          this.store.dispatch( uiAction.stopLoading() );
          Swal.fire('Registre correcte', descripcio, 'success');
        })
        .catch( err => {
          this.store.dispatch( uiAction.stopLoading() );
          Swal.fire( 'Opps, quelcom no ha sortit be', err.message, 'error');
        });

  }

}
