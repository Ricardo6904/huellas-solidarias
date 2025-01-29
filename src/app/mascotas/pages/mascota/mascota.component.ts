import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from '@interfaces/Mascota';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { MascotaService } from '../../../services/mascota.service';
import { SolicitarAdopcionService } from '../../../services/solicitar-adopcion.service';
import { Solicitud } from '@interfaces/Solicitud';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceService } from '../../../services/storage-service.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '@interfaces/Usuario';
import { nextTick } from 'process';

@Component({
  selector: 'app-mascota',
  imports: [CommonModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss',
})
export class MascotaComponent {
  cargando = false;
  private route = inject(ActivatedRoute);
  private mascotaServices = inject(MascotaService);

  constructor(
    private solicitarAdopcionService: SolicitarAdopcionService,
    private toastr: ToastrService,
    private localStorage: StorageServiceService,
    public usuarioService: UsuarioService
  ) {}

  //public mascota = signal<Mascota | undefined>(undefined);
  public mascota = toSignal(
    this.route.params.pipe(
      switchMap(({ idMascota }) =>
        this.mascotaServices.obtenerMascotasPorId(idMascota)
      )
    )
  );

  ngOnInit() {
    this.usuarioService.obtenerUsuarioPorId;
  }

  solicitarAdopcion(idMascota: number) {
    this.cargando = true;
    this.solicitarAdopcionService
      .crearNotificacionDeAdopcion(
        idMascota,
        this.usuarioService.usuario()?.id ?? 0,
        'pendiente',
        'Adopción'
      )
      .subscribe(
        () => {
          // Implementar lógica para solicitar adopción
          if (this.mascota()) {
            const solicitud: Solicitud = {
              email: this.localStorage.getItem('email')!.toString(),
              mascota: this.mascota() as Mascota,
              usuario: this.usuarioService.usuario() as Usuario,
            };

            //Enviar la solicitud al servicio
            this.solicitarAdopcionService
              .solicitarAdopcion(solicitud)
              .subscribe(
                (res) => {
                  this.usuarioService.actualizarAdopcionPendiente(
                    parseInt(this.localStorage.getItem('idUsuario')!)
                  ).subscribe({
                    next: () => {}
                  });
                  this.toastr.success(
                    'Solicitud enviada exitosamente!',
                    'Huellas Solidarias'
                  );
                  this.cargando = false;
                },
                (error) => {
                  console.error(error);
                  this.toastr.error('Error en la solicitud', error.message);
                  this.cargando = false;
                }
              );
          }
        },
        (error) => {
          this.toastr.error(error.error.message, 'Error al crear adopción');
          this.cargando = false;
        }
      );
  }

  rol() {
    this.localStorage.getItem('rol');
  }
}
