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
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
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
