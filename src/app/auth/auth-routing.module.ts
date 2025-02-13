import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgotComponent } from './pages/forgot/forgot.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { VerificacionComponent } from './pages/verificacion/verificacion.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'forgot', component: ForgotComponent},
      { path: 'login', component: LoginComponent},
      { path: 'registro', component: RegistroComponent},
      { path: 'verificacion', component: VerificacionComponent},
      { path: '**', redirectTo: 'login'}
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AuthRoutingModule { }
