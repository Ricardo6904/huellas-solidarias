import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Solicitud } from '@interfaces/Solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitarAdopcionService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  solicitarAdopcion(solicitud:Solicitud){
    return this.http.post(`${this.baseUrl}/mensajeria/solicitar-adopcion`, solicitud)
  }

}
