import { HttpInterceptorFn, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageServiceService } from '../services/storage-service.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(StorageServiceService);
  const router = inject(Router);
  const authService = inject(AuthService)
  const token = localStorage.getItem('token');

  // Clona la solicitud y agrega el token en el encabezado
  const newRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(newRequest).pipe(
    tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const newToken = event.headers.get('New-Token');
        if (newToken) {
          localStorage.setItem('token', newToken); // Actualiza el token en el almacenamiento local
        }
      }
    }),
    catchError((error) => {
      if (error.status === 401) {
        authService.logout() 
        router.navigateByUrl('/auth/login'); // Redirige al usuario a la página de login
      }
      return throwError(() => error);
    })
  );
};