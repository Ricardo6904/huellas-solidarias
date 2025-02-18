import { AnimalRescatado } from "./AnimalRescatado";
import { Usuario } from "./Usuario";

export interface Solicitud{
  email: string,
  mascota: AnimalRescatado
}

export interface Solicitud{
  usuario?:Usuario,
  email: string,
  mascota: AnimalRescatado,
}
