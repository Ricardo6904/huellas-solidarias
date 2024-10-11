export interface Mascota {
  idMascota: number,
  nombreMascota: string,
  razaMascota: string,
  sexoMascota: string,
  edadMascota: string,
  tamanoMascota: string,
  historiaMascota: string,
  caracteristicaMascota: string,
  condicionMascota: string,
  esEsterilizado: number,
  idStorage: number
  Storage: {
    urlStorage: string
  },
  idRefugio: number
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
