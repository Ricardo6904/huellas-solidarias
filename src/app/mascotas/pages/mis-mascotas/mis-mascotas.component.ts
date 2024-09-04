import { Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {

  public mascotasRefugio: Mascota[] = []

  public mascotasService = inject(MascotaService)

  idRefugio = 0

  ngOnInit(){
    this.cargarMisMascotas(this.idRefugio)
  }

  cargarMisMascotas(idRefugio:number){
    //TODO:
    
  }

}
