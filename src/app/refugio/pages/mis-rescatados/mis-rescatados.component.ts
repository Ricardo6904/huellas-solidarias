import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-mis-rescatados',
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-rescatados.component.html',
  styleUrl: './mis-rescatados.component.scss'
})
export class MisRescatadosComponent {
  loading: boolean = false;
  public currentPage = signal<number>(1);
  public totalPages: number = 0;

  filtro = {
    nombre: '',
  };

  constructor(
    public animalesRescatadosService: AnimalRescatadoService,
    private router: Router,
    private storageService: StorageServiceService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.animalesRescatadosService.obtenerMascotasPorRefugio(
      1,
      10,
      parseInt(this.storageService.getItem('idRefugio')!),
      this.filtro
    );
  }

  onFiltroChange() {
    this.animalesRescatadosService.obtenerMascotasPorRefugio(
      1,
      10,
      parseInt(this.storageService.getItem('idRefugio')!),
      this.filtro
    );
  }

  loadPage(page: number) {
    // Actualizar la página actual
    this.currentPage.set(page);
    this.animalesRescatadosService.obtenerMascotasPorRefugio(
      page,
      10,
      parseInt(this.storageService.getItem('idRefugio')!),
      this.filtro
    );
  }

  verDetallesMascota(id: number): void {
    this.animalesRescatadosService.obtenerMascotasPorId(id).subscribe({
      next: (mascota) => {
        this.router.navigate(['/mascotas/detalle', mascota.id]);
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
    this.router.navigate([`/refugio/rescatado`, id]);
  }

  eliminarMascota(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.animalesRescatadosService.eliminarMascota(id).subscribe(
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
}
