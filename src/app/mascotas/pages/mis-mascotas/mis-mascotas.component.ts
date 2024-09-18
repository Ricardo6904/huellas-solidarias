import { Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';
import { Router } from '@angular/router';

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
  public router = inject(Router)

  editarMascota(id: number): void {
    this.router.navigate([`/mascotas/editar`, id]);
  }

  eliminarMascota(id: number): void {
    
  }

}
