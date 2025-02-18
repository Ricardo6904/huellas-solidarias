import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { MisMascotasComponent } from './pages/mis-mascotas/mis-mascotas.component';
import { MiMascotaComponent } from './pages/mi-mascota/mi-mascota.component';
import { MascotaComponent } from './pages/mascota/mascota.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      {path: 'perfil', component: PerfilComponent},
      {path: 'mis-mascotas', component: MisMascotasComponent},
      {path: 'mi-mascota', component: MiMascotaComponent},
      {path: 'mi-mascota/:id', component: MiMascotaComponent},
      {path: 'mascota/:id', component: MascotaComponent},
      {path: '**', redirectTo: '/'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
