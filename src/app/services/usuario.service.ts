import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioResponse } from '@interfaces/Usuario';
import { map, tap } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

interface State {
  usuario: Usuario;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  baseUrl = environment.baseUrl;

  #state = signal<State>({
    loading: false,
    usuario: new Usuario(),
  });

  public usuario = computed(() => this.#state().usuario);
  public loading = computed(() => this.#state().loading);

  constructor(private http: HttpClient, private localStorage: StorageServiceService) {
    this.obtenerUsuarioPorId(parseInt(this.localStorage.getItem('idUsuario')!))
  }

  private actualizarEstado(parteEstado: Partial<State>) {
    this.#state.set({
      ...this.#state(),
      ...parteEstado,
    });
  }

  async obtenerUsuarioPorId(idUsuario: number) {
    await this.http
      .get<UsuarioResponse>(`${this.baseUrl}/usuario/${idUsuario}`)
      .pipe(
        tap(() => this.actualizarEstado({ loading: false })),
        map((res) => res.data)
      )
      .subscribe((usuario) => {
        this.actualizarEstado({ usuario, loading: false });
      });
  }

  obtenerUsuarioPorIdNew(idUsuario: number) {
    return this.http
      .get<UsuarioResponse>(`${this.baseUrl}/usuario/${idUsuario}`)
     
  }

  actualizarUsuario(usuario:Usuario, idUsuario:number){
    return this.http.put(`${this.baseUrl}/usuario/${idUsuario}`, usuario)
  }

  actualizarAdopcionPendiente(idUsuario: number) {
    return this.http.put<UsuarioResponse>(
      `${this.baseUrl}/usuario/${idUsuario}/solicitudPendiente`,
      {}
    );
  }

}
