

import { createAction, props } from '@ngrx/store';
import { EntradaSortida } from '../models/entrada-sortida.model';


export const setItems = createAction('[EntradaSortida] setItems',
             props<{items: EntradaSortida[]}>()
);
export const unSetItems = createAction('[EntradaSortida] unSetItems');
