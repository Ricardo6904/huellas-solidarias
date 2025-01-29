import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitarAdopcionService } from '../../../services/solicitar-adopcion.service';
import { Adopcion } from '@interfaces/Adopcion';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceService } from '../../../services/storage-service.service';
import { AuthService } from '../../../services/auth.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
    selector: 'app-adopciones',
    standalone: true,
    imports: [],
    templateUrl: './adopciones.component.html',
    styleUrl: './adopciones.component.scss'
})
export class AdopcionesComponent {
  public solicitarAdopcionService = inject(SolicitarAdopcionService)
  //public adopciones = toSignal<Adopcion[]>(this.solicitarAdopcionService.obtenerAdopcionesPorIdRefugio(parseInt(this.localStorage.getItem('idRefugio')!)))

  pendingCount: number = 0;

  constructor(private route:ActivatedRoute, private toastr:ToastrService,
    private localStorage:StorageServiceService, public adopcionService:SolicitarAdopcionService,
    private authService:AuthService, private usuarioService:UsuarioService
  ){

  }

  ngOnInit() {
  }

  getStatusClass(estado: number): string {
    return estado === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
  }

  getStatusText(estado: number): string {
    return estado === 0 ? 'Pendiente' : 'Aprobada';
  }

  aprobar(id:number){
    
    try {
      this.adopcionService.aprobarSolicitud(id).subscribe(() => {
        this.adopcionService.solicitudAceptada(id).subscribe(() => {
          this.adopcionService.obtenerAdopcionesPorIdRefugio(this.authService.getIdRefugio())
          this.usuarioService.actualizarAdopcionPendiente(parseInt(this.localStorage.getItem('idUsuario')!))
        })
        this.toastr.success('Adopción Aprobada!')
        
      })
    } catch (error) {
      
    }
  }
  rechazar(id:number){
    console.log(id);
    
    try {
      this.adopcionService.rechazarSolicitud(id).subscribe(() => {
        this.adopcionService.solicitudRechazada(id).subscribe(()=>{
          this.usuarioService.actualizarAdopcionPendiente(parseInt(this.localStorage.getItem('idUsuario')!))
        })
        this.toastr.show('Adopción rechazada!')
        
      })
    } catch (error) {
    }
  }

}
