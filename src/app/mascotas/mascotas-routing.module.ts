import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { MisMascotasComponent } from './pages/mis-mascotas/mis-mascotas.component';
import { MascotaPerdidaComponent } from './pages/mascota-perdida/mascota-perdida.component';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'agregar', component: AgregarComponent, canActivate: [authGuard], data: {rol:'refugio'} },
      { path: 'editar/:idMascota', component: AgregarComponent },
      { path: '', component: MascotasComponent },
      { path: 'detalle/:idAnimalRescatado', component: MascotaComponent },
      { path: 'mis-mascotas', component: MisMascotasComponent, canActivate: [authGuard], data: {rol:'refugio'}  },
      { path: 'mascota-perdida', component: MascotaPerdidaComponent},
      { path: 'adopciones', component: AdopcionesComponent, canActivate: [authGuard], data: {rol:'refugio'} },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotasRoutingModule { }
