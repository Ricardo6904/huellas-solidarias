import { Component } from '@angular/core';
import { Mascota } from '@interfaces/Mascota';

@Component({
  selector: 'app-mascota-perdida',
  standalone: true,
  imports: [],
  templateUrl: './mascota-perdida.component.html',
  styleUrl: './mascota-perdida.component.scss'
})
export class MascotaPerdidaComponent {
  mascota: Mascota[] = []
  cerrarModalReporte(){}
  enviarReporte(){}
  reportarAvistamiento(mascota:Mascota){}
  verDetalles(mascota:Mascota){}
}
