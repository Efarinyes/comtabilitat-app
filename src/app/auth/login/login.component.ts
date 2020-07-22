import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });
  }
  loginUsuari() {
    if ( this.loginForm.invalid) { return; }

    Swal.fire({
      title: 'Identificant, espera, si us plau',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });


    const { email, password } = this.loginForm.value;

    this.authservice.loginUsuari( email, password )
        .then( credencials => {
          console.log(credencials);
          Swal.close();
          this.router.navigate(['/']);
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message
          });
        });
  }

}
