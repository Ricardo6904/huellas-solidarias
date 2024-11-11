import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'perfil/:id', component: PerfilComponent },
      { path: 'registro', component: RegistroComponent},
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
