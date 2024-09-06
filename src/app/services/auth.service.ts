import { Injectable, afterRender, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario';
import { Auth } from '../interfaces/Auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient, private router: Router, private cookies:CookieService) {

  }

  registrar(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/auth/register`, usuario)
  }

  login(auth: Auth) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, auth).pipe(
      map(response => {
        console.log(response.token);
        this.cookies.set('rol', response.rol)
        this.cookies.set('token',response.token)
      })
    );
  }

  logout() {
    this.cookies.set('token', '')
    this.router.navigate(['/'])
    window.location.reload()
  }

  getIdToken(){
    return this.cookies.get('token')
  }

  getRol(){
    return this.cookies.get('rol')
  }

  estaLogeado(){
    return this.cookies.get('token')
  }

}
