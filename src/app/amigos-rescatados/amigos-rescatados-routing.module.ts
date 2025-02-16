import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: GaleriaComponent },
      { path: ':id', component: DetalleComponent },
      { path: '**', redirectTo: '' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmigosRescatadosRoutingModule { }
