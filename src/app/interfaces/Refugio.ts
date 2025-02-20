import { RedesSociales } from "./RedesSociales"
import { storage } from "./Storage"

export interface Refugio{
  id: number,
  nombre: string,
  direccion: string,
  idProvincia: number,
  idCiudad: number,
  celular: string,
  email: string,
  redesSociales?: RedesSociales[]
  Storage?: storage,
  descripcion: string,
  mapaUrl: string,
  latitud: string,
  longitud: string,
  Ciudad: {
    id: number,
    nombre: string
  },
  Provincia: {
    id: number,
    nombre: string
  },
}


export interface RefugiosResponse{
 data: Refugio[]
 support: Support
}

export interface RefugioResponse{
 data: Refugio
 support: Support
}

export interface Support {
  url: string;
  text: string;
}

export function getDefaultRefugio(): Refugio {
  return {
    id: 0,
    nombre: '',
    descripcion: '',
    Storage: {
      url: '',
      id: 0,
      filename: ""
    },
    celular: '',
    idCiudad: 0,
    direccion: '',
    email: '',
    idProvincia: 0,
    latitud: '',
    longitud: '',
    mapaUrl: '',
    redesSociales: [],
    Ciudad: {
      id: 0,
      nombre: ''
    },
    Provincia: {
      id: 0,
      nombre: ''
    }
  };
}