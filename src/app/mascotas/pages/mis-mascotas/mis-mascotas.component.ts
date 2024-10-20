import { afterRender, Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CookieService } from 'ngx-cookie-service';
import { StorageServiceService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {

  idRefugio!:number
  /* public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.cookie.get('idRefugio')))) */
  public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.storageService.getItem('idRefugio')!)))

  constructor(private mascotasService: MascotaService, private router: Router, private storageService:StorageServiceService){

  }

  //TODO

  ngOnInit(){
    const idRefugioTest = this.storageService.getItem('idRefugio')
  }

  cargarMascotas(){
    const idRefugioTest = this.storageService.getItem('idRefugio');
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

  eliminarMascota(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      this.mascotasService.eliminarMascota(id).subscribe({
        next: () => {
          // Obtener la lista actual de mascotas
          const currentMascotas = this.mascotas(); // Obtener el valor actual de la señal
          if (currentMascotas) {
            // Filtrar la mascota eliminada
            const updatedMascotas = currentMascotas.filter(mascota => mascota.id !== id);
            // Actualiza la señal con la nueva lista filtrada
            this.mascotas = toSignal(updatedMascotas); // Asigna la nueva señal
            alert('Mascota eliminada con éxito.');
          }
        },
        error: (error) => {
          console.error('Error al eliminar la mascota:', error);
          alert('Hubo un error al eliminar la mascota. Intenta nuevamente más tarde.');
        }
      });
    }
  }
  
  

}
