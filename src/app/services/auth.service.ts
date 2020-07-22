import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Usuari } from '../models/usuari.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public auth: AngularFireAuth, private firestore: AngularFirestore ) { }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser?.email);
      console.log(fuser?.uid);
    });
  }

  crearUsuari( nom: string, email: string, password: string ) {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
          .then( ({ user }) => {
              const nouUsuari = new Usuari( user.uid, nom, email );
              return this.firestore.doc(`${user.uid}/usuari`).set( {...nouUsuari});

          });

  }
  loginUsuari( email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
   return firebase.auth().signOut();
  }

  isAuth() {
     return this.auth.authState.pipe(
        map( fbuser => fbuser != null )
    );
  }
}
