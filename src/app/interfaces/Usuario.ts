export class Usuario{
  id?: number
  nombres?: string
  apellidos?: string
  cedula?: string
  celular?: string
  correo?: string
  clave?: string
  rol?: string
  idProvincia?: string
  idCiudad?: string
}

export interface UsuarioResponse {
  data: Usuario;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
