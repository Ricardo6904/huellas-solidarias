import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mascota, MascotaResponse, MascotasResponse } from '@interfaces/Mascota';
import { delay, map } from 'rxjs';

interface State {
  mascotas: Mascota[],
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  baseUrl = environment.baseUrl

  //usando señales el simbolo '#' se usa para propiedades privadas pero no reemplaza a private:
  #state = signal<State>({
    loading: false,
    mascotas: []
  });

  //señales computadas
  public mascotas = computed(() =>  this.#state().mascotas )
  public loading = computed(() =>  this.#state().loading )

  constructor(private http: HttpClient) {
    this.http.get<MascotasResponse>(`${this.baseUrl}/mascota`)
      .subscribe(res => {
        this.#state.set({
          loading: false,
          mascotas: res.data,
        })
      })
  }

  crearMascota(mascota:Mascota){
    return this.http.post<Mascota>(`${this.baseUrl}/mascota`, mascota)
  }

  obtenerMascotas() {
    return this.http.get<any>(`${this.baseUrl}/mascota`)
  }

  obtenerMascotasPorId( idMascota:number ){
    return this.http.get<MascotaResponse>(`${this.baseUrl}/mascota/${idMascota}`)
      .pipe(
        map( res => res.data )
      )
    }


}
