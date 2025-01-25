import { Component, signal, ViewChild } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Router } from '@angular/router';
import { StorageServiceService } from '../../../services/storage-service.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Mascota } from '@interfaces/Mascota';
import { MatPaginator } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mis-mascotas',
    imports: [FormsModule, MatTableModule, MatIconModule, MatTooltipModule, MatInputModule, MatFormFieldModule, MatPaginatorModule, CommonModule],
    templateUrl: './mis-mascotas.component.html',
    styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {
[x: string]: any;
  displayedColumns: string[] = ['position', 'nombre', 'raza', 'sexo', 'edad', 'sexo', 'tamano', 'esterilizado', 'acciones'];
  //dataSource = new MatTableDataSource<Mascota>(ELEMENT_DATA);
  public currentPage = signal<number>(1);
  public totalPages:number = 0;
 
  filtro = {
    nombre: ''
  };

  constructor(public mascotasService: MascotaService, private router: Router, private storageService: StorageServiceService,
    public toastr: ToastrService
  ) {
    console.log('total',this.mascotasService.mascotas());
  }

  ngOnInit() {
    this.calculateTotalPages();
  }
  
  calculateTotalPages() {
    const totalItems = this.mascotasService.mascotasRefugio().length; // Total de datos
    const itemsPerPage = 10; // Cantidad de elementos por página
    this.totalPages = Math.ceil(totalItems / itemsPerPage); // Redondeo hacia arriba
  }

  onFiltroChange() {
    this.mascotasService.obtenerMascotasPorRefugio(1, 10, parseInt(this.storageService.getItem('idRefugio')!), this.filtro)
  }

  loadPage(page: number) {
    // Actualizar la página actual
    this.currentPage.set(page);
    this.mascotasService.obtenerMascotasPorRefugio(page, 10, parseInt(this.storageService.getItem('idRefugio')!), this.filtro);
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

}
