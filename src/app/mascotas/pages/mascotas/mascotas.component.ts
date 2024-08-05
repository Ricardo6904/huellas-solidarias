import { Component, OnInit, afterRender } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '../../../interfaces/Mascota';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-mascotas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.scss'
})
export class MascotasComponent implements OnInit {
  mascotas: Mascota[] = []

  constructor(private mascotaService: MascotaService) {
    
  }

  ngOnInit(): void {
    this.cargarMascotas()


  }


  cargarMascotas() {
    this.mascotaService.obtenerMascotas().subscribe(response => {
      this.mascotas = response.data
    })

  }

  ngOnDestroy() {

  }


}
