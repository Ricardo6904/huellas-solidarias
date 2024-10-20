import { Injectable, afterRender, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario';
import { Auth } from '../interfaces/Auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl


  constructor(private http: HttpClient, private router: Router, private storageService:StorageServiceService) {

  }

  registrar(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/auth/register`, usuario)
  }

  login(auth: Auth) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, auth).pipe(
      map(response => {

        this.storageService.setItem('token', response.token)
        this.storageService.setItem('rol', response.rol)
        if (response.rol === 'refugio'){
          this.storageService.setItem('idRefugio', response.refugio.id)
          this.storageService.setItem('email', response.refugio.email)
          this.storageService.setItem('nombre', response.refugio.nombre)
        }
        if(response.rol === 'usuario' || response.rol === 'admin'){
          this.storageService.setItem('idUsuario', response.user.id)
          this.storageService.setItem('email', response.user.email)
          this.storageService.setItem('nombre', response.user.nombres)
        }



      }

    )
    );

  }

  logout() {
    this.storageService.removeItem('token')
    this.storageService.removeItem('idRefugio')
    this.storageService.removeItem('idUsuario')
    this.storageService.removeItem('email')
    this.storageService.removeItem('rol')
    this.router.navigate(['/'])
  }



  getRol() {
      return this.storageService.getItem('rol')
  }


  estaLogeado() {
    return this.storageService.getItem('token')
  }


}
