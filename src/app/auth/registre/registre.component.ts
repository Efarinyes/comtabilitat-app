import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styles: [
  ]
})
export class RegistreComponent implements OnInit, OnDestroy {

  formRegistre: FormGroup;
  carregant = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder, 
               private authservice: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit(): void {


    // Per fer servir aquest mètode, cal importar FormControl desde '@angular/forms'
    // this.formRegistre = this.fb.group({
    //   nom: new FormControl('', Validators.required ),
    //   correu: new FormControl('', [ Validators.required, Validators.email ] ),
    //   password: new FormControl('', Validators.required ),

    // });
    this.formRegistre = this.fb.group({
      nom: ['', Validators.required],
      correu: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe( ui => this.carregant = ui.isLoading );
  }
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  crearUsuari() {

    if ( this.formRegistre.invalid) { return; }
    this.store.dispatch( ui.isLoading() );

    // Swal.fire({
    //   title: 'Registrant usuari, espera, si us plau',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { nom, correu, password } = this.formRegistre.value;

    this.authservice.crearUsuari(nom, correu, password )
        .then( credencials => {
          console.log(credencials);
          // Swal.close();
          this.store.dispatch( ui.stopLoading() );
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.store.dispatch( ui.stopLoading() );
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          });
        });

  }
}
