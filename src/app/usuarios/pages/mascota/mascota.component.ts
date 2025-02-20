import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDefaultMascota, Mascota } from '@interfaces/Mascota';
import { MascotaService } from 'src/app/services/mascota.service';


@Component({
  selector: 'app-mascota',
  imports: [CommonModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent {
  mascota: Mascota = getDefaultMascota();
  isImageExpanded: boolean = false;
  expandedImageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    
    if (id) {
      this.mascotaService.obtenerMascotasPorId(id).subscribe({
        next: (mascota) => {
          console.log(mascota);
          
          this.mascota = mascota;
        },
        error: (error) => {
          console.error('Error al obtener detalles de la mascota:', error);
        },
      });
    }
  }

   // Método para expandir la imagen
   expandImage(imageUrl: string) {
    this.expandedImageUrl = imageUrl;
    this.isImageExpanded = true;
  }

  // Método para cerrar la imagen expandida
  closeExpandedImage() {
    this.isImageExpanded = false;
    this.expandedImageUrl = '';
  }
}
