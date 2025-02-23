import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorialMascota } from '@interfaces/HistorialMascota';
import { getDefaultMascota, Mascota } from '@interfaces/Mascota';
import { ToastrService } from 'ngx-toastr';
import { HistorialMascotasService } from 'src/app/services/historial-mascotas.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { ConfirmarUbicacionEncontradaComponent } from './confirmar-ubicacion-encontrada/confirmar-ubicacion-encontrada.component';


@Component({
  selector: 'app-mascota',
  imports: [CommonModule, ConfirmarUbicacionEncontradaComponent],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent {
  mascota: Mascota = getDefaultMascota();
  isImageExpanded: boolean = false;
  expandedImageUrl: string = '';
  showConfirmLocationDialog: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private historialMascotaService:HistorialMascotasService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    
    if (id) {
      this.mascotaService.obtenerMascotasPorId(id).subscribe({
        next: (mascota) => {
          this.mascota = mascota;
          if (mascota.estado === 'perdido') {
            this.showConfirmLocationDialog = true;
          }
        },
        error: (error) => {
          console.error('Error al obtener detalles de la mascota:', error);
        },
      });
    }
  }

   // Método para expandir la imagen
   expandImage(imageUrl: string) {
    this.expandedImageUrl = imageUrl;
    this.isImageExpanded = true;
  }

  // Método para cerrar la imagen expandida
  closeExpandedImage() {
    this.isImageExpanded = false;
    this.expandedImageUrl = '';
  }

   // Confirmar reporte de mascota encontrada
   onConfirmLocation(data: { descripcion: string, latitud: number | null, longitud: number | null }) {
    const reportData:HistorialMascota = {
      idMascota: Number(this.mascota.id),
      descripcion: data.descripcion,
      latitud: String(data.latitud),
      longitud: String(data.longitud),
      activo: true,
      fecha: new Date().toISOString(),
    };

    // Enviar datos al backend
    this.historialMascotaService.crear(reportData).subscribe({
      next: () => {
        this.toastr.success('Mascota reportada como encontrada.', 'Éxito');
        this.showConfirmLocationDialog = false;
        // Actualizar el estado de la mascota a "encontrado"
        this.mascota.estado = 'encontrado';
      },
      error: (error) => {
        this.toastr.error('Error al reportar la mascota.', 'Error');
        console.error('Error:', error);
      },
    });
  }

  // Cerrar diálogo de confirmación de ubicación
  closeConfirmLocationDialog() {
    this.showConfirmLocationDialog = false;
  }
}
