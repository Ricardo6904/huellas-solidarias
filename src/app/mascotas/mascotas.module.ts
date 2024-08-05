import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mascotasInterceptor } from '../interceptors/mascotas.interceptor';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    AgregarComponent,
    MascotaComponent,
    MascotasComponent,
  ],
  providers:[
    provideHttpClient(withInterceptors([
      mascotasInterceptor
    ])),
  ]
})
export class MascotasModule { }
