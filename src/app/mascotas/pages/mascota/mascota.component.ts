import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '@interfaces/Mascota';
import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';
import { MascotaService } from '../../../services/mascota.service';
import { SolicitarAdopcionService } from '../../../services/solicitar-adopcion.service';
import { Solicitud } from '@interfaces/Solicitud';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private solicitarAdopcionService:SolicitarAdopcionService, private authService:AuthService){}

  //public mascota = signal<Mascota | undefined>(undefined);
  public mascota = toSignal(
    this.route.params.pipe(
      switchMap(({ idMascota }) => this.mascotaServices.obtenerMascotasPorId(idMascota))
    )
  )

  solicitarAdopcion() {
    // Implementar lógica para solicitar adopción
    if(this.mascota()){
      const solicitud: Solicitud = {
        email: 'mnzioss@gmail.com',
        mascota: this.mascota() as Mascota
      };

      //Enviar la solicitud al servicio
      this.solicitarAdopcionService.solicitarAdopcion(solicitud).subscribe((res)=>{
        console.log(res);

      }, error => {
        console.error(error);

      })
    }
  }

}
