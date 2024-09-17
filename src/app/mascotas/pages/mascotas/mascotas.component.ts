import { Component, OnInit, afterRender, inject, signal } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/Mascota';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent implements OnInit {
 // Iniciar con la primera página
 public currentPage = signal<number>(1);
 public mascotasService = inject(MascotaService);

 ngOnInit(): void {
   // Cargar la primera página de mascotas
   this.loadPage(this.currentPage());
 }

 loadPage(page: number) {
   // Actualizar la página actual
   this.currentPage.set(page);
   // Cargar mascotas para la página correspondiente
   this.mascotasService.obtenerMascotas(page, 8);
 }

}
