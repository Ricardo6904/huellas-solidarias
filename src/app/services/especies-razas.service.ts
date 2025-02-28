import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EspeciesResponse, RazasResponse } from '@interfaces/EspecieRaza';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EspeciesRazasService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  obtenerEspecies() {
  
      return this.http
        .get<EspeciesResponse>(`${this.baseUrl}/especies`)
        .pipe(map((res) => res.data))
    }
  
    obtenerRazasPorIdEspecie(idProvincia: number){
      return this.http
        .get<RazasResponse>(
          `${this.baseUrl}/razas/especie/${idProvincia}`
        )
        .pipe(map((res) => res.data));
    }

    obtenerRazas(){
      return this.http.get<RazasResponse>(`${this.baseUrl}/razas`).pipe(map(res => res.data))
    }
}
