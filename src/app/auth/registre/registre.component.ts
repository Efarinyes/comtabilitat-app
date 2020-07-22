import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styles: [
  ]
})
export class RegistreComponent implements OnInit {

  formRegistre: FormGroup;

  constructor( private fb: FormBuilder, private authservice: AuthService, private router: Router) { }

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
  }

  crearUsuari() {

    if ( this.formRegistre.invalid) { return; }

    Swal.fire({
      title: 'Registrant usuari, espera, si us plau',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const { nom, correu, password } = this.formRegistre.value;

    this.authservice.crearUsuari(nom, correu, password )
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
