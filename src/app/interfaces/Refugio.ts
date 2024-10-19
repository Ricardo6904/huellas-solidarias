export interface Refugio{
  id: number,
  nombre: string,
  direccion: string,
  ciudad: string,
  provincia: string,
  celular: string,
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
