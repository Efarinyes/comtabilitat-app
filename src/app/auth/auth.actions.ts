
import { createAction, props } from '@ngrx/store';
import { Usuari } from '../models/usuari.model';

export const setUser = createAction(
    '[Auth] setUser',
    props<{ usuari: Usuari}>()
    );


export const unSetUser = createAction( '[Auth] unSetUser');
