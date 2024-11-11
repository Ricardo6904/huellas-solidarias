  import { computed, Injectable, signal } from '@angular/core';
  import { environment } from '../../environments/environment';
  import { HttpClient } from '@angular/common/http';
  import { Solicitud } from '@interfaces/Solicitud';
  import { Adopcion, AdopcionesResponse } from '@interfaces/Adopcion';
  import { map, tap } from 'rxjs';
import { StorageServiceService } from './storage-service.service';
import { AuthService } from './auth.service';

  interface State{
    adopciones: Adopcion[],
    loading: boolean,
  }

  @Injectable({
    providedIn: 'root'
  })
  export class SolicitarAdopcionService {
    baseUrl = environment.baseUrl
    constructor(private http:HttpClient, private localStorage:StorageServiceService, private authService:AuthService) {

      //this.obtenerAdopcionesPorIdRefugio(parseInt(this.localStorage.getItem('idRefugio')!))
      this.obtenerAdopcionesPorIdRefugio(this.authService.getIdRefugio())

    }

    ngOnInit(){
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

    obtenerAdopcionesPorIdRefugio(idRefugio: number){

      console.log(idRefugio);
      this.http.get<AdopcionesResponse>(`${this.baseUrl}/adopcion/mascota/refugio/${idRefugio}`)
      .pipe(
        map(res => res.data)
      ).
      subscribe((adopciones) => {
        this.actualizarEstado({adopciones, loading: false})
      })

    }

    solicitarAdopcion(solicitud:Solicitud){
      return this.http.post(`${this.baseUrl}/mensajeria/solicitar-adopcion`, solicitud)
    }

    crearNotificacionDeAdopcion(idMascota:number, idUsuario:number, estado:string, tipo: string){
      const params = {idMascota:idMascota, idUsuario:idUsuario, estado:estado, tipo: tipo}
      return this.http.post<Adopcion>(`${this.baseUrl}/adopcion`, params)
    }

  }
