import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Mascota, MascotaResponse, MascotasResponse } from '@interfaces/Mascota';
import { delay, map, tap } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

interface State {
  mascotas: Mascota[],
  loading: boolean,
  total?: number,
  totalPages?: number
}

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  baseUrl = environment.baseUrl

  //usando señales el simbolo '#' se usa para propiedades privadas pero no reemplaza a private:
  #state = signal<State>({
    loading: false,
    mascotas: [],
    total: 0,
    totalPages: 0
  });

/*   #state2 = signal<State>({
    loading: false,
    mascotas: [],
    total: 0,
    totalPages: 0
  });
 */
  //señales computadas
  public mascotas = computed(() => this.#state().mascotas)
  public loading = computed(() => this.#state().loading)

  //señal de prueba
  public mascotasRefugio = computed(() => this.#state().mascotas)
  public loadingRefugio = computed(() => this.#state().loading)
  public totalPagesMascotasRefugio = computed(() => this.#state().totalPages)
  public totalMascotasRefugio = computed(() => this.#state().total)

  constructor(private http: HttpClient, private storageService: StorageServiceService) {

    this.obtenerMascotas(1, 10)
    this.obtenerMascotasPorRefugio(1, 10, parseInt(this.storageService.getItem('idRefugio')!))
  }

  private actualizarEstado(parteEstado: Partial<State>) {
    this.#state.set({
      ...this.#state(),
      ...parteEstado
    })
  }

/*   private actualizarEstadoMascotaRefugio(parteEstado: Partial<State>){
    this.#state2.set({
      ...this.#state2(),
      ...parteEstado
    })
  } */

  obtenerMascotas(page: number, limit: number, filtros?: { nombre: string, edad: string, raza: string }) {
    this.actualizarEstado({ loading: true })

    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...filtros
    }

    this.http.get<MascotasResponse>(`${this.baseUrl}/mascota`, { params })
      .pipe(
        //delay(900), // Simulación de retardo
        tap(() => this.actualizarEstado({ loading: false })),
        map(res => res.data)
      )
      .subscribe(mascotas => {
        this.actualizarEstado({ mascotas, loading: false });

      });
  }

  crearMascota(mascota: Mascota) {
    return this.http.post<Mascota>(`${this.baseUrl}/mascota`, mascota)
      .pipe(
        tap(() => this.obtenerMascotas(10, 1))
      )
  }


  obtenerMascotasPorId(idMascota: number) {
    return this.http.get<MascotaResponse>(`${this.baseUrl}/mascota/${idMascota}`)
      .pipe(
        map(res => res.data)
      )
  }

  obtenerMascotasPorRefugio(page: number, limit: number, idRefugio: number, filtros?: { nombre: string }) {
    this.actualizarEstadoMascotaRefugio({ loading: true })
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...filtros
    }

    this.http.get<MascotasResponse>(`${this.baseUrl}/mascota/refugio/${idRefugio}`, {params})
    .pipe(
      tap(() => this.actualizarEstadoMascotaRefugio({ loading: false })),
    )
    .subscribe( res => {
        this.actualizarEstadoMascotaRefugio({mascotas: res.data, loading:false, total:res.total, totalPages:res.totalPages})
      })
  }

  actualizarMascota(idMascota: number, mascota: Partial<Mascota>) {
    return this.http.put<Mascota>(`${this.baseUrl}/mascota/${idMascota}`, mascota)
      .pipe(
        tap(() => this.obtenerMascotas(2, 10))
      );
  }

  eliminarMascota(idMascota: number) {
    return this.http.delete(`${this.baseUrl}/mascota/${idMascota}`)
  }

  incrementarSolicitudes(idMascota:number){
    return this.http.post(`${this.baseUrl}/mascota/${idMascota}/incrementar-solicitudes`, {})
  }

  decrementarSolicitudes(idMascota:number){
    return this.http.post(`${this.baseUrl}/mascota/${idMascota}/decrementar-solicitudes`, {})
  }

  mascotaAdoptada(idMascota:number){
    return this.http.put(`${this.baseUrl}/mascota/${idMascota}/mascotaAdoptada`, {})
  }

}
