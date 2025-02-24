export interface HistorialMascota {
  id?: number,
  idMascota: number,
  descripcion?: string,
  estado: string,
  latitud?: number,
  longitud?: number,
  activo: boolean,
  fecha: string,
  createdAt?: Date,
  updatedAt?: Date
}

export interface HistorialMascotasResponse {
  currentPage: number;
  total: number;
  totalPages: number;
  data: HistorialMascota[];
  support: Support;
}

export interface HistorialMascotaResponse {
  data: HistorialMascota;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}