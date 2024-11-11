import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '@interfaces/Mascota';
import { toSignal } from '@angular/core/rxjs-interop'
import { switchMap } from 'rxjs';
import { MascotaService } from '../../../services/mascota.service';
import { SolicitarAdopcionService } from '../../../services/solicitar-adopcion.service';
import { Solicitud } from '@interfaces/Solicitud';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceService } from '../../../services/storage-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent {
  cargando = false
  private route = inject(ActivatedRoute);
  private mascotaServices = inject(MascotaService);

  constructor(private solicitarAdopcionService: SolicitarAdopcionService,
    private toastr: ToastrService, private localStorage: StorageServiceService,

  ) { }

  ngOnInit() {

  }

  //public mascota = signal<Mascota | undefined>(undefined);
  public mascota = toSignal(
    this.route.params.pipe(
      switchMap(({ idMascota }) => this.mascotaServices.obtenerMascotasPorId(idMascota))
    )
  )

  solicitarAdopcion() {
    this.cargando = true
    this.solicitarAdopcionService.crearNotificacionDeAdopcion(this.mascota()!.id, parseInt(this.localStorage.getItem('idUsuario')!), 'pendiente', 'Adopción')
      .subscribe(() => {

        // Implementar lógica para solicitar adopción
        if (this.mascota()) {
          const solicitud: Solicitud = {
            email: 'mnzioss@gmail.com',
            mascota: this.mascota() as Mascota
          };

          //Enviar la solicitud al servicio
          this.solicitarAdopcionService.solicitarAdopcion(solicitud).subscribe((res) => {
            console.log(res);
            this.toastr.success('Solicitud enviada exitosamente!', 'Huellas Solidarias')
            this.cargando = false
          }, error => {
            console.error(error);
            this.toastr.error('Error en la solicitud', 'Huellas Solidarias')
            this.cargando = false
          })
        }

      }, error => {
        this.toastr.error('Error al crear adopción', 'Huellas Solidarias')
        this.cargando = false
      })

  }

  rol() {
    this.localStorage.getItem('rol')
  }

}
