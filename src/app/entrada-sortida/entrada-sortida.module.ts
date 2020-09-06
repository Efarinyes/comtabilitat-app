import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { EntradaSortidaComponent } from './entrada-sortida.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetallComponent } from './detall/detall.component';
import { OdreIngresPipe } from '../pipes/odre-ingres.pipe';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { entradaSortidaReducer } from './entrada-sortida.reducer';





@NgModule({
  declarations: [
    DashboardComponent,
    EntradaSortidaComponent,
    EstadisticaComponent,
    DetallComponent,
    OdreIngresPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('entradesSortides', entradaSortidaReducer ),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class EntradaSortidaModule { }
