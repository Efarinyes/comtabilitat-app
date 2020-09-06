import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
// import { AuthGuard } from '../services/auth.guard';


const rutesFilles: Routes = [
  { path: '',
    component: DashboardComponent,
    children:  dashboardRoutes,
    // canActivate: [ AuthGuard ]
},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( rutesFilles )
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
