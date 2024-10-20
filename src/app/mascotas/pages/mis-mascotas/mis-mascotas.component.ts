import { afterRender, Component, inject } from '@angular/core';
import { MascotaService } from '../../../services/mascota.service';
import { Mascota } from '@interfaces/Mascota';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CookieService } from 'ngx-cookie-service';
import { StorageServiceService } from '../../../services/storage-service.service';

@Component({
  selector: 'app-mis-mascotas',
  standalone: true,
  imports: [],
  templateUrl: './mis-mascotas.component.html',
  styleUrl: './mis-mascotas.component.scss'
})
export class MisMascotasComponent {

  idRefugio!:number
  /* public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.cookie.get('idRefugio')))) */
  public mascotas = toSignal<Mascota[]>(this.mascotasService.obtenerMascotasPorRefugio(parseInt(this.storageService.getItem('idRefugio')!)))

  constructor(private mascotasService: MascotaService, private router: Router, private storageService:StorageServiceService){

  }

  //TODO

  ngOnInit(){
    const idRefugioTest = this.storageService.getItem('idRefugio')
  }

  editarMascota(id: number): void {
    this.router.navigate([`/mascotas/editar`, id]);
  }

  eliminarMascota(id: number): void {

  }

}
