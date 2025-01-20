import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioResponse } from '@interfaces/Usuario';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  obtenerRefugioPorId(idRefugio:number){
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/usuario/${idRefugio}`)
    .pipe(
      map(res=>res.data)
    )
  }

  actualizarAdopcionPendiente(idUsurario:number){
    return this.http.put<UsuarioResponse>(`${this.baseUrl}/usuario/${idUsurario}/solicitudPendiente`, {})
  }

}
