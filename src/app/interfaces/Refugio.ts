export interface Refugio{
  idRefugio: number,
  nombre: string,
  direccion: string,
  ciudad: string,
  provincia: string,
  telefono: string,
  email: string,
}

export interface RefugiosResponse{
 data: Refugio[]
 support: Support
}

export interface Support {
  url: string;
  text: string;
}
