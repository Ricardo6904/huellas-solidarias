import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Ciudad, CiudadesResponse, CiudadResponse } from '@interfaces/Ciudad';
import {
  Provincia,
  ProvinciaResponse,
  ProvinciasResponse,
} from '@interfaces/Provincia';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface State {
  provincias: Provincia[];
  loading: boolean;
}

interface CiudadState {
  ciudades: Ciudad[];
  loadingC: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProvinciaCiudadService {
  baseurl = environment.baseUrl;

  #state = signal<State>({
    loading: false,
    provincias: [],
  });

  #ciudadState = signal<CiudadState>({
    loadingC: false,
    ciudades: [],
  });

  public provincias = computed(() => this.#state().provincias);
  public loading = computed(() => this.#state().loading);

  public ciudades = computed(() => this.#ciudadState().ciudades);
  public loadingC = computed(() => this.#ciudadState().loadingC);

  constructor(private http: HttpClient) {
    this.obtenerProvincias();
  }

  private actualizarEstado(parteEstado: Partial<State>) {
    this.#state.set({
      ...this.#state(),
      ...parteEstado,
    });
  }
  private actualizarEstadoCiudad(parteEstado: Partial<CiudadState>) {
    this.#state.set({
      ...this.#state(),
      ...parteEstado,
    });
  }

  obtenerProvincias() {
    this.actualizarEstado({ loading: true });

    this.http
      .get<ProvinciasResponse>(`${this.baseurl}/provincias`)
      .pipe(map((res) => res.data))
      .subscribe((provincias) => {
        this.actualizarEstado({ provincias, loading: false });
      });
  }

  obtenerCiudadesPorIdProvincia(idProvincia: number) {
    return this.http
      .get<CiudadesResponse>(
        `${this.baseurl}/ciudades/provincia/${idProvincia}`
      )
      .pipe(map((res) => res.data))
  }
 /*  obtenerCiudadesPorIdProvincia(idProvincia: number) {
    console.log('click en html');
    
    this.actualizarEstadoCiudad({ loadingC: true });

    this.http
      .get<CiudadesResponse>(
        `${this.baseurl}/ciudades/provincia/${idProvincia}`
      )
      .pipe(map((res) => res.data))
      .subscribe((ciudades) => {
        
        this.actualizarEstadoCiudad({ ciudades, loadingC: false });
        console.log(this.ciudades());
      });
  } */
}
