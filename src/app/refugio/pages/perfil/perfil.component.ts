import { Component, Inject, inject, PLATFORM_ID, effect } from '@angular/core';
import { RefugioService } from '../../../services/refugio.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { switchMap } from 'rxjs';
//import * as L from 'leaflet';
import { ActivatedRoute, Route } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WindowService } from 'src/app/services/window.service';
import { getDefaultRefugio, Refugio } from '@interfaces/Refugio';

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
  refugio: Refugio = getDefaultRefugio();
  constructor(
    public refugioService: RefugioService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private window: WindowService
  ) {
  
    
  }

  ngOnInit() {
    this.route.params
    .pipe(
      switchMap(({ idRefugio }) => {
        return this.refugioService.obtenerRefugioPorId(idRefugio);
      })
    )
    .subscribe({
      next: (res) => {
        this.refugio = res;
        if (isPlatformBrowser(this.platformId)) {

          setTimeout(async () => {
            this.initMap(Number(this.refugio?.latitud), Number(this.refugio?.longitud));
          }, 0);
        }
      },
      error: (err) => {
        console.error('Error al obtener el refugio:', err);
      }
    });
  }

  ngAfterViewInit() {
    if (this.refugio && this.refugio?.latitud && this.refugio?.longitud) {
      /* setTimeout(async () => {
        this.initMap(Number(this.refugio?.latitud), Number(this.refugio?.longitud));
      }, 0); */
    }
  }
  private async initMap(latitud: number, longitud: number) {
    const L = await import('leaflet').then(module => module.default);
    
    
    latitud = parseFloat(this.refugio!.latitud);
    longitud = parseFloat(this.refugio!.longitud);

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
      const win = this.window.nativeWindow
      win!.open(
        `https://www.google.com/maps/dir/?api=1&destination=${latitud},${longitud}`,
        '_blank'
      );
    });
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
