
import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './entrada-sortida.actions';
import { EntradaSortida } from '../models/entrada-sortida.model';

export interface State {
    items: EntradaSortida[];
}

export const initialState: State = {
   items: [],
}

// tslint:disable-next-line: variable-name
const _entradaSortidaReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, state => ({...state, items: [] }))

);

export function entradaSortidaReducer(state, action) {
    return _entradaSortidaReducer(state, action);
}
