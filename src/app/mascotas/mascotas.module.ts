import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MascotasRoutingModule } from './mascotas-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MascotasRoutingModule,
    AgregarComponent,
  ],
  providers:[
    provideHttpClient(withInterceptors([
    ])),
  ]
})
export class MascotasModule { }
