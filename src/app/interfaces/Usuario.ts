import { Ciudad } from './Ciudad';
import { Provincia } from './Provincia';

export class Usuario {
  id?: number;
  nombres?: string;
  apellidos?: string;
  tipoIdentidad?: string;
  identidad?: string;
  codigoCelular?: string;
  celular?: string;
  email?: string;
  clave?: string;
  rol?: string;
  direccion?: string;
  estado?: string;
  idProvincia?: number;
  adopcionPendiente?: boolean;
  idCiudad?: number;
  ciudad?: Ciudad;
  provincia?: Provincia;
  infoAdicional?: InfoAdicional;
}

export interface InfoAdicional {
  tienePatio: boolean;
  tieneCerramiento: boolean;
  viveEnCasaODepartamento: string;
  arriendoOPropia: string;
}

export interface UsuarioResponse {
  data: Usuario;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
