import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { AnimalesRescatadosResponse, AnimalRescatado, AnimalRescatadoResponse } from '@interfaces/AnimalRescatado';
import { environment } from 'src/environments/environment';
import { StorageServiceService } from './storage-service.service';
import { map, tap } from 'rxjs';


interface State {
  mascotas: AnimalRescatado[];
  loading: boolean;
}
interface StateMascotasRefugio {
  mascotasR: AnimalRescatado[];
  loading: boolean;
  total: number;
  totalPages: number;
}


@Injectable({
  providedIn: 'root'
})
export class AnimalRescatadoService {
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
    //this.obtenerMascotas(1, 10);
    
  }

  ngOnInit(){
    this.obtenerMascotasPorRefugio(1, 10, parseInt(this.storageService.getItem('idRefugio')!));
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
      .get<AnimalesRescatadosResponse>(`${this.baseUrl}/animalRescatado`, { params })
      .pipe(
        //delay(900), // Simulación de retardo
        tap(() => this.actualizarEstado({ loading: false })),
        map((res) => res.data)
      )
      .subscribe((mascotas) => {
        
        this.actualizarEstado({ mascotas, loading: false });
      });
  }

  crearMascota(mascota: AnimalRescatado) {
    return this.http
      .post<AnimalRescatado>(`${this.baseUrl}/animalRescatado`, mascota)
      .pipe(tap(() => this.obtenerMascotas(10, 1)));
  }

  obtenerMascotasPorId(id: number) {
    return this.http
      .get<AnimalRescatadoResponse>(`${this.baseUrl}/animalRescatado/${id}`)
      .pipe(map((res) => res.data));
  }

  obtenerMascotasPorRefugio(
    page: number,
    limit: number,
    idRefugio: number,
    filtros?: { nombre: string }
  ) {
    this.actualizarEstadoMR({ loading: true });
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      ...filtros,
    };

    this.http
      .get<AnimalesRescatadosResponse>(`${this.baseUrl}/animalRescatado/refugio/${idRefugio}`, {
        params,
      })
      .pipe(tap(() => this.actualizarEstadoMR({ loading: false })))
      .subscribe((res) => {
        this.actualizarEstadoMR({
          mascotasR: res.data,
          loading: false,
          total: res.total,
          totalPages: res.totalPages,
        });
      });
  }

    actualizarMascota(id: number, mascota: Partial<AnimalRescatado>) {
      return this.http
        .put<AnimalRescatado>(`${this.baseUrl}/animalRescatado/${id}`, mascota)
        .pipe(tap(() => this.obtenerMascotas(2, 10)));
    }
  
    eliminarMascota(id: number) {
      return this.http.delete(`${this.baseUrl}/animalRescatado/${id}`);
    }
  
    incrementarSolicitudes(id: number) {
      return this.http.post(
        `${this.baseUrl}/animalRescatado/${id}/incrementar-solicitudes`,
        {}
      );
    }
  
    decrementarSolicitudes(id: number) {
      return this.http.post(
        `${this.baseUrl}/animalRescatado/${id}/decrementar-solicitudes`,
        {}
      );
    }
  
    mascotaAdoptada(id: number) {
      return this.http.put(
        `${this.baseUrl}/animalesRescatados/${id}/mascotaAdoptada`,
        {}
      );
    }
}
