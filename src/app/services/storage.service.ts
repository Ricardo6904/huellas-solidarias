import { Injectable } from '@angular/core';
import { storage } from '../interfaces/Storage';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: storage[] = []
  baseUrl = environment.baseUrl
  constructor(private http:HttpClient) { }

  subirImagen(file:FormData):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/storage`,file)
  }

  obtenerUrlPorIdStorage(idStorage:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/storage`)
  }

}
