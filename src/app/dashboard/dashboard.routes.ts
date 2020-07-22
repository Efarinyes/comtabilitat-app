import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../entrada-sortida/estadistica/estadistica.component';
import { EntradaSortidaComponent } from '../entrada-sortida/entrada-sortida.component';
import { DetallComponent } from '../entrada-sortida/detall/detall.component';


export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'entrada-sortida', component: EntradaSortidaComponent },
    { path: 'detall', component: DetallComponent }
]