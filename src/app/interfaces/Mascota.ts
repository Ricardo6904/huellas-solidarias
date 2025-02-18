import { Refugio } from "./Refugio";

export interface Mascota {
  id: number,
  nombre: string,
  especie: string,
  raza: string,
  edad: string,
  sexo: string,
  tamano: string,
  descripcion: string,
  estado: string,
  urlQR: number,
  idStorage: number
  Storage: {
    url: string
  },
  idUsuario: number
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
