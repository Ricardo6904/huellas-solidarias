import { Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {

  mascotas: Mascota[] = [];

  public mascotasService = inject(MascotaService)
  editarMascota(id: number): void {
  }

  eliminarMascota(id: number): void {
  }

}
