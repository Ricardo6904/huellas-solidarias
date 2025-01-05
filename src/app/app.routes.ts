import { Routes } from '@angular/router';
import { LandingPageComponent } from './contenido/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./contenido/contenido.module').then(m => m.ContenidoModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./mascotas/mascotas.module').then(m => m.MascotasModule)
  },
  {
    path: 'refugio',
    loadChildren: () => import('./refugio/refugio.module').then(m => m.RefugioModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
