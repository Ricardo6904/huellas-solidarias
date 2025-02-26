import { Refugio } from "./Refugio";

export interface AnimalRescatado {
  id: number,
  nombre: string,
  idEspecie: number,
  idRaza: number,
  sexo: string,
  edad: string,
  tamano: string,
  historia: string,
  caracteristica: string,
  condicion: string,
  esEsterilizado: number,
  idStorage: number,
  Storage: {
    id: number,
    url: string
  },
  idRefugio: number
  refugio: Refugio,
  estado: string,
  solicitudesPendientes: number | 0,
  raza: {
    id: number,
    nombre: string
  }
}

export interface AnimalesRescatadosResponse {
  currentPage: number;
  total: number;
  totalPages: number;
  data: AnimalRescatado[];
  support: Support;
}

export interface AnimalRescatadoResponse {
  data: AnimalRescatado;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
