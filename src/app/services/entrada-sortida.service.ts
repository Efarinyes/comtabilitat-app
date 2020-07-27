import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import 'firebase/firestore';
import { EntradaSortida } from '../models/entrada-sortida.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntradaSortidaService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService
              ) { }

  crearEntradaSortida( entradaSortida: EntradaSortida) {
    // Aqui va Tot
    // Inserció de document a Firestore
    const uid = this.authService.user.uid;

    return this.firestore.doc(`${ uid }/entrada-sortida`)
        .collection('items')
        .add( {...entradaSortida });

  }

  iniciEntredesSortidesListener( uid: string ) {
   return this.firestore.collection(`${uid}/entrada-sortida/items`)
        .snapshotChanges()
        .pipe(
          map( snapshot => snapshot.map( doc => ({
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data() as any
              })
            )
          )
        );
  }
}
