import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as entradaSortida from './entrada-sortida/entrada-sortida.reducer';



export interface AppState {
   ui: ui.State;
   usuari: auth.State;
   entradesSortides: entradaSortida.State;
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   usuari: auth. authReducer,
   entradesSortides: entradaSortida.entradaSortidaReducer
};
