import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistreComponent } from './auth/registre/registre.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'registre', component: RegistreComponent },
    // Aixi es feia abans de modular l'aplicació per treballar amb LazyLoad
    // { path: '', component: DashboardComponent, children:  dashboardRoutes, canActivate: [ AuthGuard ] },
    // Amb LazyLad
    {
        path: '',
        canLoad: [AuthGuard],
        loadChildren: () => import('./entrada-sortida/entrada-sortida.module').then(m => m.EntradaSortidaModule)
    },

    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [
        RouterModule.forRoot( routes )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}

