import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';

@Component({
  selector: 'app-galeria',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent {
  filtro = {
      nombre: '',
      edad: '',
      raza: '',
      tamano: ''
    };
  
   // Iniciar con la primera página
   public currentPage = signal<number>(1);
   public animalesRescatadosService = inject(AnimalRescatadoService);
   public meta = inject(Meta);
   public title = inject(Title);
  
   constructor(){
      this.loadPage(1)
   }
  
  
   ages: string[] = ['Cachorro', 'Joven', 'Adulto', 'Mayor'];
    sizes: string[] = ['Pequeño', 'Mediano', 'Grande'];
    breeds: string[] = ['Mestizo', 'Labrador', 'Pastor Alemán', 'Bulldog', 'Chihuahua'];
    locations: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];
  
   ngOnInit(): void {
     // Cargar la primera página de mascotas
     //this.loadPage(this.currentPage());
     this.loadPage(1);
     this.title.setTitle('Adopta Huellas - Galería');
      this.meta.updateTag({ name: 'description', content: 'Encuentra a tu mejor amigo en nuestra plataforma de adopción de perros.' });
      this.meta.updateTag({ property: 'og:title', content: 'Adopta un amigo' });
      this.meta.updateTag({ property: 'og:description', content: 'Conecta con mascotas que buscan un hogar.' });
   }
  
   loadPage(page: number) {
     // Actualizar la página actual
     this.currentPage.set(page);
     // Cargar mascotas para la página correspondiente
     this.animalesRescatadosService.obtenerMascotas(page, 8);
   }
  
  
   onFiltroChange(){
  
    this.animalesRescatadosService.obtenerMascotas(1, 9, this.filtro)
   }
}
