import { Mascota } from "./Mascota";
import { Usuario } from "./Usuario";

export interface Solicitud{
  email: string,
  mascota: Mascota
}

export interface Solicitud{
  usuario?:Usuario,
  email: string,
  mascota: Mascota
}
