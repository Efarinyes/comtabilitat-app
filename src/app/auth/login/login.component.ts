import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  carregant = false;
  uiSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private authservice: AuthService,
               private store: Store<AppState>,
               private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });

    // tslint:disable-next-line: no-shadowed-variable
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
        this.carregant = ui.isLoading;
       // console.log('Carregant subs');
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }



  loginUsuari() {
    if ( this.loginForm.invalid) { return; }
    this.store.dispatch( ui.isLoading());

    // Swal.fire({
    //   title: 'Identificant, espera, si us plau',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });


    const { email, password } = this.loginForm.value;

    this.authservice.loginUsuari( email, password )
        .then( credencials => {
          console.log(credencials);
         // Swal.close();
          this.store.dispatch( ui.stopLoading());
          this.router.navigate(['/']);
        })
        .catch(error => {
          this.store.dispatch( ui.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          });
        });
  }

}
