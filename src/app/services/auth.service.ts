import { Injectable, afterRender, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/Usuario';
import { Auth } from '../interfaces/Auth';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageServiceService
  ) {}

  registrar(payload: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, payload);
  }
  /* registrar(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/auth/register`, usuario);
  } */

  login(auth: Auth) {
    this.storageService.clear();
    return this.http.post<any>(`${this.baseUrl}/auth/login`, auth).pipe(
      map((response) => {
        this.storageService.setItem('token', response.token);
        this.storageService.setItem('rol', response.rol);
        if (response.rol === 'refugio') {
          this.storageService.setItem('idRefugio', response.refugio.id);
          this.storageService.setItem('email', response.refugio.email);
          this.storageService.setItem('nombre', response.refugio.nombre);
        }
        if (response.rol === 'usuario' || response.rol === 'admin') {
          this.storageService.setItem('idUsuario', response.user.id);
          this.storageService.setItem('email', response.user.email);
          this.storageService.setItem('nombre', response.user.nombres);
        }
      })
    );
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  recuperarContrasena(email: string) {
    return this.http.post(`${this.baseUrl}/auth/recuperarContrasena`, {
      email,
    });
  }

  verificarCodigo(token: string, codigo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-code`, { token, codigo });
  }

  reenviarCodigo(token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/resend-code`, { token });
  }

  getRol() {
    return this.storageService.getItem('rol');
  }

  estaLogeado() {
    return this.storageService.getItem('token');
  }

  getEmail() {
    return this.storageService.getItem('email');
  }

  getNombre() {
    return this.storageService.getItem('nombre');
  }

  getIdRefugio() {
    return parseInt(this.storageService.getItem('idRefugio')!);
  }

  getidUsuario() {
    return parseInt(this.storageService.getItem('idUsuario')!);
  }

  isAuthenticated() {
    return this.storageService.getItem('token') ? true : false;
  }
  hasRole(requiredRole: string) {
    const rol = this.storageService.getItem('rol');

    return rol?.includes(requiredRole);
  }
  isAuthenticatedScreen(): Observable<boolean> {
    return of(!!this.storageService.getItem('token')); // Devuelve un Observable<boolean>
  }
}
