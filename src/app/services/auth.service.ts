import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as authActions from '../auth/auth.actions';
import * as entradaSortidaActions from '../entrada-sortida/entrada-sortida.actions';

import { Store } from '@ngrx/store';

import { Usuari } from '../models/usuari.model';
import { AppState } from '../app.reducer';



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: Subscription;
  private _user: Usuari;

  get user() {
    return {...this._user };
  }


  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      // console.log(fuser?.uid);
      if (fuser) {
        // tenim Usuari
      this.userSubscription = this.firestore
          .doc(`${fuser.uid}/usuari`)
          .valueChanges()
          .subscribe((firestoreUser: any) => {
           // console.log('firestoreUser', firestoreUser );
            const usuari = Usuari.fromFirebase(firestoreUser);
            this._user = usuari;
            this.store.dispatch(authActions.setUser({ usuari }));
            
          });
      } else {
        // no tenim usuari
        if (this.userSubscription) {
          this._user = null;
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch(authActions.unSetUser());
        this.store.dispatch(entradaSortidaActions.unSetItems());
      }
    });
  }

  crearUsuari(nom: string, email: string, password: string) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const nouUsuari = new Usuari(user.uid, nom, email);
        return this.firestore.doc(`${user.uid}/usuari`).set({ ...nouUsuari });
      });
  }
  loginUsuari(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map((fbuser) => fbuser != null));
  }
}
