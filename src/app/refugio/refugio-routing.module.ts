import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NotificacionesAdopcionComponent } from './pages/notificaciones-adopcion/notificaciones-adopcion.component';
import { MisRescatadosComponent } from './pages/mis-rescatados/mis-rescatados.component';
import { RescatadoComponent } from './pages/rescatado/rescatado.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'perfil/:idRefugio', component: PerfilComponent },
      { path: 'registro', component: RegistroComponent, canActivate: [authGuard], data: {rol:'refugio'}},
      { path: 'notificaciones-adopcion', component: NotificacionesAdopcionComponent, canActivate: [authGuard], data: {rol:'refugio'}},
      { path: 'mis-rescatados', component: MisRescatadosComponent, canActivate: [authGuard], data: {rol:'refugio'}},
      { path: 'rescatado', component: RescatadoComponent, canActivate: [authGuard], data: {rol:'refugio'}},
      { path: 'rescatado/:id', component: RescatadoComponent, canActivate: [authGuard], data: {rol:'refugio'}},
      { path: '**', redirectTo: 'perfil' }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( routes)
  ]
})

export class RefugioRoutingModule { }
