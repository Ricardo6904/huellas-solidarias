import { computed, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '@interfaces/Solicitud';
import { Adopcion, AdopcionesResponse } from '@interfaces/Adopcion';
import { map, tap } from 'rxjs';
import { StorageServiceService } from './storage-service.service';
import { AuthService } from './auth.service';

interface State {
  adopciones: Adopcion[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitarAdopcionService {
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,
    private localStorage: StorageServiceService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  #state = signal<State>({
    loading: false,
    adopciones: [],
  });

  //señales computadas
  public adopciones = computed(() => this.#state().adopciones);
  public loading = computed(() => this.#state().loading);

  private actualizarEstado(parteEstado: Partial<State>) {
    this.#state.set({
      ...this.#state(),
      ...parteEstado,
    });
  }

  /* obtenerAdopciones(){
      this.actualizarEstado({loading:true})

      this.http.get<AdopcionesResponse>(`${this.baseUrl}/adopcion`)
      .pipe(
        tap(()=>this.actualizarEstado({loading:false})),
        map(res=>res.data)
      )
      .subscribe(adopciones => {
        this.actualizarEstado({adopciones, loading:false})

      })
    } */

  /*  obtenerAdopcionesPorIdRefugio(idRefugio: number){

      this.http.get<AdopcionesResponse>(`${this.baseUrl}/adopcion/mascota/refugio/${idRefugio}`)
      .pipe(
        map(res => res.data)
      ).
      subscribe((adopciones) => {
        this.actualizarEstado({adopciones, loading: false})
      })

    } */
  /* obtenerAdopcionesPorIdRefugioNew(idRefugio: number){

      return this.http.get<AdopcionesResponse>(`${this.baseUrl}/adopcion/mascota/refugio/${idRefugio}`)
      .pipe(
        map(res => res.data)
      )

    } */

  obtenerAdopcionesPorIdRefugioNew(
    idRefugio: number,
    page: number = 1,
    limit: number = 10
  ) {
    return this.http
      .get<AdopcionesResponse>(
        `${this.baseUrl}/adopcion/mascota/refugio/${idRefugio}?page=${page}&limit=${limit}`
      )
      .pipe(map((res) => res));
  }

  solicitarAdopcion(solicitud: Solicitud) {
    return this.http.post(
      `${this.baseUrl}/mensajeria/solicitar-adopcion`,
      solicitud
    );
  }

  solicitudAceptada(id: number) {
    return this.http.post(
      `${this.baseUrl}/mensajeria/${id}/solicitud-aceptada`,
      {}
    );
  }
  solicitudRechazada(id: number) {
    return this.http.post(
      `${this.baseUrl}/mensajeria/${id}/solicitud-rechazada`,
      {}
    );
  }

  crearNotificacionDeAdopcion(
    idAnimalRescatado: number,
    idUsuario: number,
    estado: string,
    tipo: string
  ) {
    const params = {
      idAnimalRescatado: idAnimalRescatado,
      idUsuario: idUsuario,
      estado: estado,
      tipo: tipo,
    };
    return this.http.post<Adopcion>(`${this.baseUrl}/adopcion`, params);
  }

  aprobarSolicitud(idSolicitud: number) {
    return this.http.put(
      `${this.baseUrl}/adopcion/${idSolicitud}/aprobarSolicitud`,
      {}
    );
  }
  rechazarSolicitud(idSolicitud: number) {
    return this.http.put(
      `${this.baseUrl}/adopcion/${idSolicitud}/rechazarSolicitud`,
      {}
    );
  }
}
