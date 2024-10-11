import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Adopcion, AdopcionesResponse } from '@interfaces/Adopcion';
import { map, tap } from 'rxjs';

interface State{
  adopciones: Adopcion[],
  loading: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AdopcionService {
  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) {
    this.obtenerAdopciones()
   }

  #state = signal<State>({
    loading: false,
    adopciones: []
  });

   //señales computadas
   public adopciones = computed(() =>  this.#state().adopciones )
   public loading = computed(() =>  this.#state().loading )

   private actualizarEstado(parteEstado: Partial<State>){
    this.#state.set({
      ...this.#state(),
      ...parteEstado
    })
  }

  obtenerAdopciones(){
    this.actualizarEstado({loading:true})

    this.http.get<AdopcionesResponse>(`${this.baseUrl}/adopcion`)
    .pipe(
      tap(()=>this.actualizarEstado({loading:false})),
      map(res=>res.data)
    )
    .subscribe(adopciones => {
      this.actualizarEstado({adopciones, loading:false})
    })
  }

}
