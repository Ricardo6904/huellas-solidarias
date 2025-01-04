import { Component, inject } from '@angular/core';
import { RefugioService } from '../../../services/refugio.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
    selector: 'app-perfil',
    imports: [CommonModule],
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.scss'
})
export class PerfilComponent {

  private route = inject(ActivatedRoute);
  constructor(public refugioService:RefugioService, ){

  }

    //public mascota = signal<Mascota | undefined>(undefined);
  public refugio = toSignal(
    this.route.params.pipe(
      switchMap(({ idRefugio }) => this.refugioService.obtenerRefugioPorId(idRefugio))
    )
  )

  ngOnInit(){
    console.log(this.refugio());

  }

  getIconClass(nombre: string): string {
    switch (nombre) {
        case 'Facebook':
            return 'fab fa-facebook';
        case 'Twitter':
            return 'fab fa-twitter';
        case 'Instagram':
            return 'fab fa-instagram';
        // Otros casos...
        default:
            return ''; // Asegúrate de devolver una cadena vacía o una clase predeterminada.
    }
}


}
