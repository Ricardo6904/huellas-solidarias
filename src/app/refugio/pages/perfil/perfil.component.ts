import { Component, inject } from '@angular/core';
import { RefugioService } from '../../../services/refugio.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Route } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-perfil',
    imports: [CommonModule],
    templateUrl: './perfil.component.html',
    styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  private sanitizer = inject(DomSanitizer);
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

  getSafeMapUrl(mapaUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapaUrl);
}

  getIconClass(nombre: string): string {
    switch (nombre) {
        case 'facebook':
            return '../assets/icons/facebook.svg';
        case 'twitter':
            return '../assets/icons/twitter.svg';
        case 'instagram':
            return '../assets/icons/instagram.svg';
        // Otros casos...
        default:
            return ''; // Asegúrate de devolver una cadena vacía o una clase predeterminada.
    }

    
}


}
