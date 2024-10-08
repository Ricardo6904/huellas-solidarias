import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotComponent } from './pages/forgot/forgot.component';





@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RegistroComponent,
    LoginComponent,
    ForgotComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
