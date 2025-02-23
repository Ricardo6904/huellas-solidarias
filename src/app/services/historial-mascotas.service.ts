import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HistorialMascota } from '@interfaces/HistorialMascota';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistorialMascotasService {
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  crear(historialMascota:HistorialMascota){
    return this.http.post(`${this.baseUrl}/historialMascotas`, historialMascota)
  }

  obtener(idHistorialMascota:number){
    return this.http.get(`${this.baseUrl}/historialMascotas/${idHistorialMascota}`)
  }
}
