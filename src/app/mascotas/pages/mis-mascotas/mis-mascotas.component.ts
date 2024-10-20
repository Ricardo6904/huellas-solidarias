import { afterRender, Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CookieService } from 'ngx-cookie-service';
import { StorageServiceService } from '../../../services/storage-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {
  filtro = {
    nombre: ''
  };

  idRefugio!:number
  /* public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.cookie.get('idRefugio')))) */
  public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.storageService.getItem('idRefugio')!)))

  constructor(private mascotasService: MascotaService, private router: Router, private cookie: CookieService, private storageService:StorageServiceService){

  }

  //TODO

  ngOnInit(){
    const idRefugioTest = this.storageService.getItem('idRefugio')
  }

  onFiltroChange() {
    const nombreFiltro = this.filtro.nombre.toLowerCase();
  
    // Obtener todas las mascotas del servicio
    this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.storageService.getItem('idRefugio')!)).subscribe({
      next: (mascotas) => {
        // Filtrar las mascotas por nombre
        const mascotasFiltradas = mascotas.filter(mascota =>
          mascota.nombre.toLowerCase().includes(nombreFiltro)
        );
  
        // Actualizar el Signal con las mascotas filtradas
        (this.mascotas as any).update(() => mascotasFiltradas);
      },
      error: (error) => {
        console.error('Error al obtener mascotas:', error);
      }
    });
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
  }

}
