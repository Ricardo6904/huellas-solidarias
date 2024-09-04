import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { MisMascotasComponent } from './pages/mis-mascotas/mis-mascotas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'agregar', component: AgregarComponent },
      { path: 'listar', component: MascotasComponent },
      { path: 'detalle/:idMascota', component: MascotaComponent },
      { path: 'mis-mascotas', component: MisMascotasComponent },
      { path: '**', redirectTo: 'listar' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
