import { Component, OnInit, afterRender, inject, signal } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/Mascota';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent implements OnInit {
  filtro = {
    nombre: '',
    edad: '',
    raza: '',
    tamano: ''
  };

 // Iniciar con la primera página
 public currentPage = signal<number>(1);
 public mascotasService = inject(MascotaService);

 filteredDogs: Mascota[] = [];

 ages: string[] = ['Cachorro', 'Joven', 'Adulto', 'Mayor'];
  sizes: string[] = ['Pequeño', 'Mediano', 'Grande'];
  breeds: string[] = ['Labrador', 'Pastor Alemán', 'Bulldog', 'Chihuahua', 'Mestizo'];
  locations: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];

 ngOnInit(): void {
   // Cargar la primera página de mascotas
   this.loadPage(this.currentPage());
 }

 loadPage(page: number) {
   // Actualizar la página actual
   this.currentPage.set(page);
   // Cargar mascotas para la página correspondiente
   this.mascotasService.obtenerMascotas(page, 9);
 }


 onFiltroChange(){
  console.log(this.filtro);

  this.mascotasService.obtenerMascotas(1, 9, this.filtro)
 }
}
