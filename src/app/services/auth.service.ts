import { Injectable, afterRender, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario';
import { Auth } from '../interfaces/Auth';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl


  constructor(private http: HttpClient, private router: Router, private cookies: CookieService, private storageService:StorageServiceService) {

  }

  registrar(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/auth/register`, usuario)
  }

  login(auth: Auth) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, auth).pipe(
      map(response => {
        console.log(response);

        this.cookies.set('rol', response.rol)
        this.cookies.set('token', response.token)
        if (response.rol === 'refugio'){
          this.cookies.set('idRefugio', response.refugio.idRefugio)
          this.storageService.setItem('idRefugio', response.refugio.idRefugio)
          this.cookies.set('email', response.refugio.email)
          this.cookies.set('nombre', response.refugio.nombre)
        }
        if(response.rol === 'usuario' || response.rol === 'admin'){
          this.cookies.set('idUsuario', response.user.id)
          this.cookies.set('email', response.user.email)
          this.cookies.set('nombre', response.user.nombres)
        }



      }

    )
    );

  }

  logout() {
    this.cookies.set('token', '')
    this.cookies.set('idRegudio', '')
    this.cookies.set('idUsuario', '')
    this.cookies.set('email', '')
    this.cookies.set('rol', '')
    this.router.navigate(['/'])
    window.location.reload()
  }

  getIdToken() {
    return this.cookies.get('token')
  }

  getRol() {
      return this.cookies.get('rol')
  }

  getIdRefugio() {
    return this.cookies.get('idRefugio')
  }

  estaLogeado() {
    return this.cookies.get('token')
  }


}
