import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { RedesSocialesResponse } from '@interfaces/RedesSociales';
import { RedesSociales } from '@interfaces/Refugio';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

interface State {
  redesSociales: RedesSociales[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RedesSocialesService {
baseUrl = environment.baseUrl

  #state = signal<State>({
    loading: false,
    redesSociales: []
  });

  constructor(private http:HttpClient) { }

   obtenerRedesSocialesPorIdRefugio(idRefugio:number){
      return this.http.get<RedesSocialesResponse>(`${this.baseUrl}/redesSociales/${idRefugio}`)
      .pipe(
        map(res=>res.data)
      )
    }
}
