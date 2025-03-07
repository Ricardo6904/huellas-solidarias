import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Raza } from '@interfaces/EspecieRaza';
import { AnimalRescatadoService } from 'src/app/services/animal-rescatado.service';
import { EspeciesRazasService } from 'src/app/services/especies-razas.service';

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
      idRaza: '',
      tamano: ''
    };
  
   // Iniciar con la primera página
   public currentPage = signal<number>(1);
   public animalesRescatadosService = inject(AnimalRescatadoService);
   public meta = inject(Meta);
   public title = inject(Title);
   public especieRazaService = inject(EspeciesRazasService);

   constructor(){}
  
  
    ages: string[] = ['Cachorro', 'Joven', 'Adulto', 'Mayor'];
    sizes: string[] = ['Pequeño', 'Mediano', 'Grande'];
    razas: Raza[] = [];
    locations: string[] = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao'];
  
   ngOnInit(): void {
    this.especieRazaService.obtenerRazas().subscribe({
      next: res => {
        this.razas = res
      }
    })
    this.loadPage(this.currentPage())
     this.title.setTitle('Adopta Huellas - Galería');
      this.meta.updateTag({ name: 'description', content: 'Encuentra a tu mejor amigo en nuestra plataforma de adopción de perros.' });
      this.meta.updateTag({ property: 'og:title', content: 'Adopta un amigo' });
      this.meta.updateTag({ property: 'og:description', content: 'Conecta con mascotas que buscan un hogar.' });
   }
  
   loadPage(page: number) {
     this.currentPage.set(page);
     this.animalesRescatadosService.obtenerMascotas(page, 8);
   }
  
  
   onFiltroChange(){
  
    this.animalesRescatadosService.obtenerMascotas(1, 9, this.filtro)
   }

   aplicarFiltros(){

   }

   limpiarFiltros(){
    
   }
}
