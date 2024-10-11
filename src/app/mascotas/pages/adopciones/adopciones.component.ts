import { Component, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdopcionService } from '../../../services/adopcion.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SolicitarAdopcionService } from '../../../services/solicitar-adopcion.service';
import { Adopcion } from '@interfaces/Adopcion';

interface Adoption {
  idAdopcion: number;
  estado: number;
  mascota: {
    nombre: string;
    imagenUrl: string;
  };
  usuario: {
    nombre: string;
    correo: string;
    cedula: string;
  };
}

@Component({
  selector: 'app-adopciones',
  standalone: true,
  imports: [],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.scss'
})
export class AdopcionesComponent {
  public solicitarAdopcionService = inject(SolicitarAdopcionService)
  public adopciones = toSignal<Adopcion[]>(this.solicitarAdopcionService.obtenerAdopcionesPorIdRefugio(parseInt(this.cookie.get('idRefugio'))))

  adoptions: Adoption[] = [];
  pendingCount: number = 0;

  constructor(private cookie:CookieService, private route:ActivatedRoute){
    console.log(parseInt(this.cookie.get('idRefugio')));

  }



  ngOnInit() {
    // Simular la carga de datos desde un servicio
    this.adoptions = [
      {
        idAdopcion: 1,
        estado: 0,
        mascota: {
          nombre: 'Max',
          imagenUrl: 'https://via.placeholder.com/100x100'
        },
        usuario: {
          nombre: 'Juan Pérez',
          correo: 'juan@example.com',
          cedula: '1234567890'
        }
      },
      {
        idAdopcion: 2,
        estado: 0,
        mascota: {
          nombre: 'Luna',
          imagenUrl: 'https://via.placeholder.com/100x100'
        },
        usuario: {
          nombre: 'María García',
          correo: 'maria@example.com',
          cedula: '0987654321'
        }
      }
    ];

    this.pendingCount = this.adoptions.filter(a => a.estado === 0).length;
  }

  getStatusClass(estado: number): string {
    return estado === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800';
  }

  getStatusText(estado: number): string {
    return estado === 0 ? 'Pendiente' : 'Aprobada';
  }
}
