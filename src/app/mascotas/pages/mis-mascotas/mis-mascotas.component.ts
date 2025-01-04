import { Component } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Router } from '@angular/router';
import { StorageServiceService } from '../../../services/storage-service.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-mis-mascotas',
    imports: [FormsModule],
    templateUrl: './mis-mascotas.component.html',
    styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {
  filtro = {
    nombre: ''
  };

  constructor(public mascotasService: MascotaService, private router: Router, private storageService: StorageServiceService,
    public toastr: ToastrService
  ) {}

  onFiltroChange() {
    this.mascotasService.obtenerMascotasPorRefugio(1, 10, parseInt(this.storageService.getItem('idRefugio')!), this.filtro)
  }


  verDetallesMascota(id: number): void {
    this.mascotasService.obtenerMascotasPorId(id).subscribe({
      next: (mascota) => {
        // Aquí puedes hacer algo con la mascota, por ejemplo, navegar a una página de detalles
        this.router.navigate(['/mascotas/detalle', mascota.id]);
      },
      error: (error) => {
        console.error('Error al obtener detalles de la mascota:', error);
        alert('No se pudo obtener los detalles de la mascota. Intenta nuevamente más tarde.');
      }
    });
  }

  editarMascota(id: number): void {
    this.router.navigate([`/mascotas/editar`, id]);
  }

  eliminarMascota(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotasService.eliminarMascota(id).subscribe(() => {
        this.toastr.info('Mascota Eliminada!', 'Huellas Solidarias')
      }, error => {
        this.toastr.error(`Ha ocurrido un error! ${error}`,'Huellas Solidarias')
      })
    }
  }

  /* eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotasService.eliminarMascota(id).subscribe({
        next: () => {
          alert('Mascota eliminada correctamente.');

          const mascotasActuales = this.mascotas(); // Obtener el valor actual de las mascotas
          if (mascotasActuales) { // Verificar que no sea undefined
            const nuevasMascotas = mascotasActuales.filter(mascota => mascota.id !== id);
            // Actualizar el valor de las mascotas usando `toSignal` o un mecanismo adecuado
            // Dependiendo de cómo se esté gestionando el `Signal`, podrías necesitar otra manera de actualizarlo
            (this.mascotas as any).update(() => nuevasMascotas); // Reemplaza `update()` con la forma adecuada de actualizar el Signal en tu caso
          }
        },
        error: (error) => {
          console.error('Error al eliminar la mascota:', error);
          alert('No se pudo eliminar la mascota. Intenta nuevamente más tarde.');
        }
      });
    }
  } */

}
