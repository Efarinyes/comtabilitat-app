import { createReducer, on } from '@ngrx/store';
import { setUser, unSetUser } from './auth.actions';
import { Usuari } from '../models/usuari.model';

export interface State {
    usuari: Usuari;
}

export const initialState: State = {
    usuari: null,
}

const _authReducer = createReducer(initialState,

    on( setUser, (state, { usuari }) => ({ ...state, usuari: { ...usuari } })),
    on( unSetUser, state => ({ ...state, usuari: null}))

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}