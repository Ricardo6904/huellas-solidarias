import { Component, Inject, inject, PLATFORM_ID, effect } from '@angular/core';
import { RefugioService } from '../../../services/refugio.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Route } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private map: any;
  constructor(
    public refugioService: RefugioService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private window: WindowService
  ) {
    /* effect(() => {
      const refugio = this.refugio();
      if (refugio && refugio.latitud && refugio.longitud) {
        this.initMap(parseFloat(refugio.latitud), parseFloat(refugio.longitud));
      }
    }); */
    effect(() => {
      const refugio = this.refugio();
      if (refugio && refugio.latitud && refugio.longitud) {
        console.log('Refugio data:', refugio); // Verifica los datos en la consola
        this.initMap(parseFloat(refugio.latitud), parseFloat(refugio.longitud));
      } 
    });
    
  }

  public refugio = toSignal(
    this.route.params.pipe(
      switchMap(({ idRefugio }) =>
        this.refugioService.obtenerRefugioPorId(idRefugio)
      )
    )
  );

  ngOnInit() {}

  /* private async initMap(latitud: number, longitud: number) {
    const L = await import('leaflet');

    latitud = parseFloat(this.refugio()!.latitud);
    longitud = parseFloat(this.refugio()!.longitud);

    this.map = L.map('map').setView([latitud, longitud], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    const marker = L.marker([latitud, longitud], {
      icon: L.icon({
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
      }),
    }).addTo(this.map);

    marker.on('click', () => {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`,
        '_blank'
      );
    });
  } */

    private async initMap(latitud: number, longitud: number) {
      if (isPlatformBrowser(this.platformId)) { // Asegúrate de que el código solo se ejecute en el navegador
        const L = await import('leaflet');
        
        // Asegúrate de que el DOM esté disponible
        if (!this.map) {
          this.map = L.map('map').setView([latitud, longitud], 13);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
          }).addTo(this.map);
      
          const marker = L.marker([latitud, longitud], {
            icon: L.icon({
              iconUrl:
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl:
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              shadowSize: [41, 41],
            }),
          }).addTo(this.map);
      
          marker.on('click', () => {
            window.open(
              `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`,
              '_blank'
            );
          });
        }
      }
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
