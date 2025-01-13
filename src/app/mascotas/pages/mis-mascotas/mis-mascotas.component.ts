import { Component, ViewChild } from '@angular/core';
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

@Component({
    selector: 'app-mis-mascotas',
    imports: [FormsModule, MatTableModule, MatIconModule, MatTooltipModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
    templateUrl: './mis-mascotas.component.html',
    styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {
  displayedColumns: string[] = ['position', 'nombre', 'raza', 'sexo', 'edad', 'sexo', 'tamano', 'esterilizado', 'acciones'];
  //dataSource = new MatTableDataSource<Mascota>(ELEMENT_DATA);

  dataSource = new MatTableDataSource<Mascota>(this.mascotasService.mascotasRefugio()) || null;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | null = null;


  filtro = {
    nombre: ''
  };

  constructor(public mascotasService: MascotaService, private router: Router, private storageService: StorageServiceService,
    public toastr: ToastrService
  ) {}

  ngOninit(){
    this.dataSource.paginator = this.paginator;
  }

  onFiltroChange() {
    this.mascotasService.obtenerMascotasPorRefugio(1, 10, parseInt(this.storageService.getItem('idRefugio')!), this.filtro)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);

  }
}
