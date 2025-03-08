import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Mascota } from '@interfaces/Mascota';
import { ToastrService } from 'ngx-toastr';
import { MascotaService } from 'src/app/services/mascota.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { QRCodeComponent } from 'angularx-qrcode';
import { environment } from 'src/environments/environment';
import { HistorialMascotasService } from 'src/app/services/historial-mascotas.service';
import { ReportarMascotaPerdidaComponent } from './reportar-mascota-perdida/reportar-mascota-perdida.component';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-mis-mascotas',
  imports: [
    CommonModule,
    FormsModule,
    QRCodeComponent,
    ReportarMascotaPerdidaComponent,
  ],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss',
})
export class MisMascotasComponent {
  openedMenuId: number | null = null; // ID de la mascota cuyo menú está abierto
  showReportDialog = false; // Controla la visibilidad del diálogo
  showMapDialog = false;
  Math!: Math;

  loading: boolean = false;
  public currentPage = signal<number>(1);
  public totalPages: number = 0;

  showQRPopup: boolean = false;
  qrData: string = '';
  selectedMascota: any = null;

  filtro = {
    nombre: '',
  };

  constructor(
    public mascotasService: MascotaService, // Cambiar el servicio
    private router: Router,
    private storageService: StorageServiceService,
    public toastr: ToastrService,
    private historialMascotaService: HistorialMascotasService,
    private window: WindowService
  ) {}

  ngOnInit() {
    this.cargarData();
  }

  private async initMap(latitud: number, longitud: number) {
    const L = await import('leaflet').then((module) => module.default);

    if (this.showMapDialog && this.selectedMascota?.ubicacion) {
      if (latitud === 0 || longitud === 0) {
        this.toastr.warning(
          'Las coordenadas proporcionadas no son válidas.',
          'Ubicación no disponible'
        );
        return;
      }

      const map = L.map('map').setView([latitud, longitud], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const marker = L.marker([latitud, longitud], {
        icon: L.icon({
          iconUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          shadowSize: [41, 41],
        }),
      }).addTo(map);

      /* L.marker([latitud, longitud])
        .addTo(map)
        .bindPopup('Ubicación de la mascota')
        .openPopup(); */
        marker.on('click', () => {
          const win = this.window.nativeWindow
          win!.open(
            `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`,
            '_blank'
          );
        });
    }
  }

  cargarData() {
    this.mascotasService.obtenerMascotasPorUsuario(
      1,
      10,
      parseInt(this.storageService.getItem('idUsuario')!),
      this.filtro
    );
  }

  // Método para mostrar el popup del código QR
  mostrarQR(mascota: any) {
    this.selectedMascota = mascota;
    this.qrData = `${environment.baseUrl}/mascotas/redirect/${mascota.id}`;
    this.showQRPopup = true;
  }

  // Método para cerrar el popup
  closeQRPopup() {
    this.showQRPopup = false;
    this.selectedMascota = null;
    this.qrData = '';
  }

  // Método para descargar el código QR
  downloadQR() {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qr-code-${this.selectedMascota.nombre}.png`;
      link.click();
    }
  }

  onFiltroChange() {
    this.mascotasService.obtenerMascotasPorUsuario(
      1,
      10,
      parseInt(this.storageService.getItem('idUsuario')!), // Cambiar a idUsuario
      this.filtro
    );
  }

  loadPage(page: number) {
    this.currentPage.set(page);
    this.mascotasService.obtenerMascotasPorUsuario(
      page,
      10,
      parseInt(this.storageService.getItem('idUsuario')!),
      this.filtro
    );
  }

  verDetallesMascota(id: number): void {
    this.mascotasService.obtenerMascotasPorId(id).subscribe({
      next: (mascota) => {
        this.router.navigate(['/usuario/mascota', mascota.id]);
      },
      error: (error) => {
        console.error('Error al obtener detalles de la mascota:', error);
        alert(
          'No se pudo obtener los detalles de la mascota. Intenta nuevamente más tarde.'
        );
      },
    });
  }

  editarMascota(id: number): void {
    this.router.navigate([`/usuario/mi-mascota`, id]);
  }

  eliminarMascota(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotasService.eliminarMascota(id).subscribe({
        next: (res) => {
          this.toastr.info('Mascota Eliminada!', 'Huellas Solidarias');
          this.cargarData();
        },
        error: (error) => {
          this.toastr.error(
            `Ha ocurrido un error! ${error}`,
            'Huellas Solidarias'
          );
        },
      });
    }
  }

  toggleMenu(mascotaId: number) {
    this.openedMenuId = this.openedMenuId === mascotaId ? null : mascotaId;
  }

  // Abrir diálogo para reportar mascota perdida
  reportarMascotaPerdida(mascota: any) {
    this.selectedMascota = mascota;
    this.showReportDialog = true;
    //this.openedMenuId = null; // Cerrar el menú
  }

  // Confirmar reporte
  onConfirmReport(reportData: any) {
    this.historialMascotaService.crear(reportData).subscribe({
      next: () => {
        this.toastr.success('Mascota reportada como perdida.', 'Éxito');
        this.closeReportDialog();
        this.cargarData();
      },
      error: (error) => {
        this.toastr.error('Error al reportar la mascota.', 'Error');
        console.error('Error:', error);
      },
    });
  }

  // Cerrar diálogo
  closeReportDialog() {
    this.showReportDialog = false;
    this.selectedMascota = null;
  }

  // Confirmar reporte
  confirmReport() {
    // Lógica para reportar la mascota como perdida
    this.closeReportDialog();
  }

  // Ver historial
  verHistorial(mascota: any) {
    // Lógica para ver el historial de la mascota
    this.openedMenuId = null; // Cerrar el menú
  }

  mascotaEnCasa(mascotaId: number) {
    this.mascotasService.cambiarEstado(mascotaId, 'seguro').subscribe({
      next: () => {
        this.toastr.success('Mascota esta a salvo.');
        this.cargarData();
      },
    });
  }

  mostrarMapa(mascota: any) {
    this.historialMascotaService
      .obtenerHistorialReciente(mascota.id)
      .subscribe({
        next: (historial: any) => {
          if (
            historial &&
            historial.latitud !== 0 &&
            historial.longitud !== 0
          ) {
            // Asignar las coordenadas al objeto selectedMascota
            this.selectedMascota = {
              ...mascota,
              ubicacion: {
                latitud: historial.data.latitud,
                longitud: historial.data.longitud,
              },
            };
            this.initMap(historial.data.latitud, historial.data.longitud);
            this.showMapDialog = true; // Mostrar el diálogo del mapa
          } else {
            this.toastr.warning(
              'El usuario no ha proporcionado información sobre la ubicación. Lo sentimos.',
              'Ubicación no disponible'
            );
          }
        },
        error: (error) => {
          this.toastr.error(
            'Error al obtener la ubicación de la mascota.',
            'Error'
          );
          console.error('Error:', error);
        },
      });
  }

  // Método para cerrar el diálogo del mapa
  closeMapDialog() {
    this.showMapDialog = false;
    this.selectedMascota = null;
  }

  // Método para redirigir a Google Maps
  redirigirAGoogleMaps() {
    if (this.selectedMascota && this.selectedMascota.ubicacion) {
      const { latitud, longitud } = this.selectedMascota.ubicacion;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`;
      window.open(url, '_blank');
    }
  }

  registrarMascota() {
    this.router.navigateByUrl('/usuario/mi-mascota');
  }

  getPaginationRange() {
    return [];
  }
}
