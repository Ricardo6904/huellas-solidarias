import { Routes } from '@angular/router';

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
    path: 'refugio',
    loadChildren: () => import('./refugio/refugio.module').then(m => m.RefugioModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'amigos-rescatados',
    loadChildren: () => import('./amigos-rescatados/amigos-rescatados.module').then(m => m.AmigosRescatadosModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
