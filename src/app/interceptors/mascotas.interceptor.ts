import { HttpInterceptorFn } from '@angular/common/http';

export const mascotasInterceptor: HttpInterceptorFn = (req, next) => {
  let reqCloned = req;

  if (localStorage.getItem('token')) {
    reqCloned = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token')!
      }
    })
  }

  return next(reqCloned);
};
