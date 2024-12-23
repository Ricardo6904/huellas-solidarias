import { storage } from "./Storage"

export interface Refugio{
  id: number,
  nombre: string,
  direccion: string,
  ciudad: string,
  provincia: string,
  celular: string,
  email: string,
  redesSociales: RedesSociales[]
  Storage?: storage
}

export interface RedesSociales{
  id?: number
  nombre: string
  url: string
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
