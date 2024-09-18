import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mascota, MascotaResponse, MascotasResponse } from '@interfaces/Mascota';
import { delay, map, tap } from 'rxjs';

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
    /*this.http.get<MascotasResponse>(`${this.baseUrl}/mascota`)
      .subscribe(res => {
        this.#state.set({
          loading: false,
          mascotas: res.data,
        })
      })*/
     this.obtenerMascotas(1, 10)
  }

  private actualizarEstado(parteEstado: Partial<State>){
    this.#state.set({
      ...this.#state(),
      ...parteEstado
    })
  }

  obtenerMascotas(page:number, limit:number) {
    this.actualizarEstado({loading: true})

    const params = { page: page.toString(), limit: limit.toString()}

    this.http.get<MascotasResponse>(`${this.baseUrl}/mascota`, {params})
      .pipe(
        //delay(500), // Simulación de retardo
        tap(() => this.actualizarEstado({ loading: false })), // Desactivar loading
        map(res => res.data)
      )
      .subscribe(mascotas => {
        this.actualizarEstado({ mascotas, loading: false });

      });
  }

  crearMascota(mascota:Mascota){
    return this.http.post<Mascota>(`${this.baseUrl}/mascota`, mascota)
    .pipe(
      tap(() => this.obtenerMascotas(10, 1))
    )
  }


  obtenerMascotasPorId( idMascota:number ){
    return this.http.get<MascotaResponse>(`${this.baseUrl}/mascota/${idMascota}`)
      .pipe(
        map( res => res.data )
      )
    }


    obtenerMascotasPorRefugio( idRefugio: number){
      return this.http.get<MascotasResponse>(`${this.baseUrl}/mascota/${idRefugio}`).
      pipe(
        map(res => res.data)
      )
    }

    actualizarMascota(idMascota: number, mascota: Partial<Mascota>) {
      return this.http.put<Mascota>(`${this.baseUrl}/mascota/${idMascota}`, mascota)
        .pipe(
          tap(() => this.obtenerMascotas(2,10))
        );
    }

}
