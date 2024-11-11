import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RefugioRoutingModule } from './refugio-routing.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PerfilComponent,
    RegistroComponent,
    RefugioRoutingModule
  ]
})
export class RefugioModule { }
