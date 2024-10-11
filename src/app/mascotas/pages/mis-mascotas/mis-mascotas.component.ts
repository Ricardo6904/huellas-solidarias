import { Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {

  constructor(private mascotasService: MascotaService, private router: Router, private cookie: CookieService){}
  //TODO
  public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.cookie.get('idRefugio'))))


  editarMascota(id: number): void {
    this.router.navigate([`/mascotas/editar`, id]);
  }

  eliminarMascota(id: number): void {

  }

}
