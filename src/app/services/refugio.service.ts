import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Refugio, RefugioResponse } from '@interfaces/Refugio';
import { map } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

interface State {
  refugio: Refugio | null,
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class RefugioService {
  baseUrl = environment.baseUrl

  #state2 = signal<State>({
    loading: false,
    refugio: null
  });

  public refugio = computed(() => this.#state2().refugio)
  public loading = computed(()=>this.#state2().loading)

  constructor(private http:HttpClient, private localStorage:StorageServiceService) {
    this.obtenerRefugioPorId(parseInt(this.localStorage.getItem('idRefugio')!))

   }

  private actualizarEstado(parteEstado: Partial<State>){
    console.log(parteEstado);

    this.#state2.set({
      ...this.#state2(),
      ...parteEstado
    })
  }

  obtenerRefugioPorId(idRefugio:number){
    return this.http.get<RefugioResponse>(`${this.baseUrl}/refugio/${idRefugio}`)
    .pipe(
      map(res=>res.data)
    )
  }

}
