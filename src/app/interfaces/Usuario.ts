export class Usuario{
  id?: number
  nombres?: string
  apellidos?: string
  cedula?: string
  celular?: string
  correo?: string
  clave?: string
  rol?: string
  direccion?: string
  estado?: string
  idProvincia?: number
  adopcionPendiente?:boolean
  idCiudad?: number
}

export interface UsuarioResponse {
  data: Usuario;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
