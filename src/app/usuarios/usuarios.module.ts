import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PerfilComponent
  ]
})
export class UsuariosModule { }
