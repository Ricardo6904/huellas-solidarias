import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AnimalRescatado } from '@interfaces/AnimalRescatado';
import { Solicitud } from '@interfaces/Solicitud';
import { Usuario } from '@interfaces/Usuario';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';
import { SolicitarAdopcionService } from 'src/app/services/solicitar-adopcion.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent {
cargando = false;
  private route = inject(ActivatedRoute);
  private AnimalesRescatadosService = inject(AnimalRescatadoService);

  constructor(
    private solicitarAdopcionService: SolicitarAdopcionService,
    private toastr: ToastrService,
    private localStorage: StorageServiceService,
    public usuarioService: UsuarioService
  ) {}

  //public mascota = signal<Mascota | undefined>(undefined);
  public mascota = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) =>
        this.AnimalesRescatadosService.obtenerMascotasPorId(id)
      )
    )
  );

  ngOnInit() {
    this.usuarioService.obtenerUsuarioPorId;
  }

  solicitarAdopcion(id: number) {
    this.cargando = true;
    if(!this.localStorage.getItem('token')){
      this.toastr.warning('Inicie sesión para enviar solicitudes','Sesión requerida')
      this.cargando=false
      return 
    }
    this.solicitarAdopcionService
      .crearNotificacionDeAdopcion(
        id,
        this.usuarioService.usuario()?.id ?? 0,
        'pendiente',
        'adopción'
      )
      .subscribe(
        () => {
          // Implementar lógica para solicitar adopción
          if (this.mascota()) {
            const solicitud: Solicitud = {
              email: this.localStorage.getItem('email')!.toString(),
              mascota: this.mascota() as AnimalRescatado,
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
