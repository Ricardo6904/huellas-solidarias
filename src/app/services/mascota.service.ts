import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }

  obtenerMascotas(){
    return this.http.get<any>(`${this.baseUrl}/mascota`)
  }

}
