import { Refugio } from "./Refugio";

export interface Mascota {
  id: number,
  nombre: string,
  raza: string,
  sexo: string,
  edad: string,
  tamano: string,
  historia: string,
  caracteristica: string,
  condicion: string,
  esEsterilizado: number,
  idStorage: number
  Storage: {
    url: string
  },
  idRefugio: number
  refugio: Refugio
}

export interface MascotasResponse {
  currentPage: number;
  total: number;
  totalPages: number;
  data: Mascota[];
  support: Support;
}

export interface MascotaResponse {
  data: Mascota;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
