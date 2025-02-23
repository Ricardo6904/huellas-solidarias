import { afterRender, computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  Mascota,
  MascotaResponse,
  MascotasResponse,
} from '@interfaces/Mascota';
import { delay, map, tap } from 'rxjs';
import { StorageServiceService } from './storage-service.service';

interface State {
  mascotas: Mascota[];
  loading: boolean;
}
interface StateMascotasRefugio {
  mascotasR: Mascota[];
  loading: boolean;
  total: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  baseUrl = environment.baseUrl;

  //usando señales el simbolo '#' se usa para propiedades privadas pero no reemplaza a private:
  #state = signal<State>({
    loading: false,
    mascotas: [],
  });

  #stateMascotasRefugio = signal<StateMascotasRefugio>({
    loading: false,
    mascotasR: [],
    total: 0,
    totalPages: 0,
  });

  //señales computadas
  public mascotas = computed(() => this.#state().mascotas);
  public loading = computed(() => this.#state().loading);

  //señales de Mascotas por Refugio
  public mascotasRefugio = computed(
    () => this.#stateMascotasRefugio().mascotasR
  );
  public loadingMR = computed(() => this.#stateMascotasRefugio().loading);
  public totalPagesMR = computed(() => this.#stateMascotasRefugio().totalPages);
  public totalMR = computed(() => this.#stateMascotasRefugio().total);

  constructor(
    private http: HttpClient,
    private storageService: StorageServiceService
  ) {
    this.obtenerMascotas(1, 10);
    
  }

  ngOnInit(){
    this.obtenerMascotasPorUsuario(1, 10, parseInt(this.storageService.getItem('idUsuario')!));
  }

  private actualizarEstado(parteEstado: Partial<State>) {
    this.#state.set({
      ...this.#state(),
      ...parteEstado,
    });
  }

  private actualizarEstadoMR(parteEstado: Partial<StateMascotasRefugio>) {
    this.#stateMascotasRefugio.set({
      ...this.#stateMascotasRefugio(),
      ...parteEstado,
    });
  }

  obtenerMascotas(
    page: number,
    limit: number,
    filtros?: { nombre: string; edad: string; raza: string }
  ) {
    this.actualizarEstado({ loading: true });

    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...filtros,
    };

    this.http
      .get<MascotasResponse>(`${this.baseUrl}/mascotas`, { params })
      .pipe(
        //delay(900), // Simulación de retardo
        tap(() => this.actualizarEstado({ loading: false })),
        map((res) => res.data)
      )
      .subscribe((mascotas) => {
        this.actualizarEstado({ mascotas, loading: false });
      });
  }

  crearMascota(mascota: Mascota) {
    return this.http
      .post<Mascota>(`${this.baseUrl}/mascotas`, mascota)
      .pipe(tap(() => this.obtenerMascotas(10, 1)));
  }

  obtenerMascotasPorId(idMascota: number) {
    return this.http
      .get<MascotaResponse>(`${this.baseUrl}/mascotas/${idMascota}`)
      .pipe(map((res) => res.data));
  }

  cambiarEstado(id:number, estado:string){
    return this.http.put(`${this.baseUrl}/mascotas/estado/${id}`, { estado })
  }

  obtenerMascotasPorUsuario(
    page: number,
    limit: number,
    idUsuario: number,
    filtros?: { nombre: string }
  ) {
    this.actualizarEstadoMR({ loading: true });
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...filtros,
    };

    this.http
      .get<MascotasResponse>(`${this.baseUrl}/mascotas/usuario/${idUsuario}`, {
        params,
      })
      .pipe(tap(() => this.actualizarEstadoMR({ loading: false })))
      .subscribe((res) => {
        console.log(res
          
        );
        
        this.actualizarEstadoMR({
          mascotasR: res.data,
          loading: false,
          total: res.total,
          totalPages: res.totalPages,
        });
      });
  }

  actualizarMascota(idMascota: number, mascota: Partial<Mascota>) {
    return this.http
      .put<Mascota>(`${this.baseUrl}/mascotas/${idMascota}`, mascota)
      .pipe(tap(() => this.obtenerMascotas(2, 10)));
  }

  eliminarMascota(idMascota: number) {
    return this.http.delete(`${this.baseUrl}/mascotas/${idMascota}`);
  }

  incrementarSolicitudes(idMascota: number) {
    return this.http.post(
      `${this.baseUrl}/mascotas/${idMascota}/incrementar-solicitudes`,
      {}
    );
  }

  decrementarSolicitudes(idMascota: number) {
    return this.http.post(
      `${this.baseUrl}/mascotas/${idMascota}/decrementar-solicitudes`,
      {}
    );
  }

  mascotaAdoptada(idMascota: number) {
    return this.http.put(
      `${this.baseUrl}/mascotas/${idMascota}/mascotaAdoptada`,
      {}
    );
  }
}
