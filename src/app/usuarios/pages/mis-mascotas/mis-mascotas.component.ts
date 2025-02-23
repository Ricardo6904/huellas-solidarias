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


@Component({
  selector: 'app-mis-mascotas',
  imports: [CommonModule, FormsModule, QRCodeComponent, ReportarMascotaPerdidaComponent],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {
  openedMenuId: number | null = null; // ID de la mascota cuyo menú está abierto
  showReportDialog = false; // Controla la visibilidad del diálogo

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
    private historialMascotaService:HistorialMascotasService
  ) {}

  ngOnInit() {
    this.cargarData()
  }

  cargarData(){
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
    console.log(this.filtro);
    
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
      this.mascotasService.eliminarMascota(id).subscribe(
        () => {
          this.toastr.info('Mascota Eliminada!', 'Huellas Solidarias');
        },
        (error) => {
          this.toastr.error(
            `Ha ocurrido un error! ${error}`,
            'Huellas Solidarias'
          );
        }
      );
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
        this.cargarData()
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
    console.log('Reportar mascota:', this.selectedMascota);
    this.closeReportDialog();
  }

  // Ver historial
  verHistorial(mascota: any) {
    // Lógica para ver el historial de la mascota
    console.log('Ver historial de:', mascota);
    this.openedMenuId = null; // Cerrar el menú
  }

  mascotaEnCasa(mascotaId: number){
    this.mascotasService.cambiarEstado(mascotaId, 'seguro').subscribe({
      next: () => {
        this.toastr.success('Mascota esta a salvo.');
        this.cargarData()
      }
    })
  }
}
