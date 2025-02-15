import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitarAdopcionService } from '../../../services/solicitar-adopcion.service';
import { Adopcion } from '@interfaces/Adopcion';
import { ToastrService } from 'ngx-toastr';
import { StorageServiceService } from '../../../services/storage-service.service';
import { AuthService } from '../../../services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adopciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.scss',
})
export class AdopcionesComponent {
  public solicitarAdopcionService = inject(SolicitarAdopcionService);
  adopciones: Adopcion[] = [];
  pendingCount: number = 0;
  loading = true;
  page = 1;
  limit = 5;
  totalAdopciones = 0;
  Math = Math; 
  mostrarModal: boolean = false;
  informacionAdicional: any = null;

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private localStorage: StorageServiceService,
    public adopcionService: SolicitarAdopcionService,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.getAdopcionesPorIdRefugio();
  }

  getAdopcionesPorIdRefugio() {
    this.subscription = this.adopcionService
      .obtenerAdopcionesPorIdRefugioNew(this.authService.getIdRefugio(), this.page, this.limit)
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.adopciones = res.data;
        },
      });
  }

  cambiarPagina(nuevaPagina: number) {
    this.page = nuevaPagina;
    this.getAdopcionesPorIdRefugio();
  }

  getStatusClass(estado: number): string {
    return estado === 0
      ? 'bg-yellow-100 text-yellow-800'
      : 'bg-green-100 text-green-800';
  }

  getStatusText(estado: number): string {
    return estado === 0 ? 'Pendiente' : 'Aprobada';
  }

  aprobar(id: number) {
    this.loading = true
    try {
      this.adopcionService.aprobarSolicitud(id).subscribe(() => {
        this.adopcionService.solicitudAceptada(id).subscribe(() => {
          this.adopcionService.obtenerAdopcionesPorIdRefugioNew(
            this.authService.getIdRefugio()
          );
          this.loading  = false
          this.getAdopcionesPorIdRefugio();
        });
        
        this.toastr.success('Adopción Aprobada!');
      });
    } catch (error) {}
  }
  rechazar(id: number) {
    this.loading = true
    try {
      this.adopcionService.rechazarSolicitud(id).subscribe(() => {
        this.adopcionService.solicitudRechazada(id).subscribe(() => {
          
          this.loading = false
          this.getAdopcionesPorIdRefugio();
        });
        this.toastr.show('Adopción rechazada!');
      });
    } catch (error) {}
  }

  verInformacionAdicional(infoAdicional: any) {
    if (typeof infoAdicional === 'string') {
      this.informacionAdicional = JSON.parse(infoAdicional);
    } else {
      this.informacionAdicional = infoAdicional;
    }
    this.mostrarModal = true;
  }
  cerrarModal() {
    this.mostrarModal = false;
    this.informacionAdicional = null;
  }
}
