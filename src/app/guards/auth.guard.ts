import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const localStorage = inject(StorageServiceService)
    const requiredRol = route.data['rol']; // Obtén el rol requerido de la ruta
    const router = inject(Router)
    const authService = inject(AuthService)
    if(!authService.isAuthenticated() ){
      router.navigate(['/auth/login'])
      return false
    }
    if(!authService.hasRole(requiredRol)){
      router.navigate(['/mascotas'])
      return false;
    }
    return true
};
