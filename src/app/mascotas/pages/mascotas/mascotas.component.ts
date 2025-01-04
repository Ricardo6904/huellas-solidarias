import { Component, OnInit, afterRender, inject, signal } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/Mascota';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';


@Component({
    selector: 'app-mascotas',
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
 public meta = inject(Meta);
 public title = inject(Title);


 ages: string[] = ['Cachorro', 'Joven', 'Adulto', 'Mayor'];
  sizes: string[] = ['Pequeño', 'Mediano', 'Grande'];
  breeds: string[] = ['Mestizo', 'Labrador', 'Pastor Alemán', 'Bulldog', 'Chihuahua'];
  locations: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];

 ngOnInit(): void {
   // Cargar la primera página de mascotas
   this.loadPage(this.currentPage());

   this.title.setTitle('Adopta un amigo - Adopción de perros');
    this.meta.updateTag({ name: 'description', content: 'Encuentra a tu mejor amigo en nuestra plataforma de adopción de perros.' });
    this.meta.updateTag({ property: 'og:title', content: 'Adopta un amigo' });
    this.meta.updateTag({ property: 'og:description', content: 'Conecta con mascotas que buscan un hogar.' });
 }

 loadPage(page: number) {
   // Actualizar la página actual
   this.currentPage.set(page);
   // Cargar mascotas para la página correspondiente
   this.mascotasService.obtenerMascotas(page, 9);
 }


 onFiltroChange(){

  this.mascotasService.obtenerMascotas(1, 9, this.filtro)
 }
}
