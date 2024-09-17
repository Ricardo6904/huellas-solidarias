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
 mascotas: Mascota[] = []

 public mascotass = signal<Mascota[]>([])
 public currentPage = signal<number>(1)

  public mascotasService = inject(MascotaService)
  ngOnInit(): void {

  }

  loadPage(page:number){
    this.currentPage.set(page)
  }

}
