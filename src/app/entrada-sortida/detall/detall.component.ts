import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { EntradaSortida } from '../../models/entrada-sortida.model';
import { Subscription } from 'rxjs';
import { EntradaSortidaService } from '../../services/entrada-sortida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detall',
  templateUrl: './detall.component.html',
  styles: [
  ]
})
export class DetallComponent implements OnInit, OnDestroy {

  entradesSortides: EntradaSortida[] = [];
  itemsSub: Subscription;

  constructor( private store: Store<AppState>,
               private entradaSortidaService: EntradaSortidaService ) { }

  ngOnInit(): void {

   this.itemsSub = this.store.select('entradesSortides').subscribe( ({items}) => this.entradesSortides = items );
  }
  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }


  borrar(uid: string ) {
    this.entradaSortidaService.borrarEntradaSortida( uid )
        .then( () =>  Swal.fire('Borrat', 'Apunt borrat correctament', 'success'))
        .catch( err =>  Swal.fire('Upps!', err.message, 'error'));
   }

}
