import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '@interfaces/Mascota';
import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';
import { MascotaService } from '../../../services/mascota.service';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent {

  private route = inject(ActivatedRoute);
  private mascotaServices = inject(MascotaService);

  //public mascota = signal<Mascota | undefined>(undefined);
  public mascota = toSignal(
    this.route.params.pipe(
      switchMap(({ idMascota }) => this.mascotaServices.obtenerMascotasPorId(idMascota))
    )
  )

  solicitarAdopcion() {
    // Implementar lógica para solicitar adopción
    console.log('Solicitud de adopción para:', this.mascota()?.nombreMascota);
  }

}
