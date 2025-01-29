import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageServiceService } from '../services/storage-service.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(StorageServiceService)
  const token = localStorage.getItem('token')
  
  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `${token}`),
  });
  return next(newRequest);
};
