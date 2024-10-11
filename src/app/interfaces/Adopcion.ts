import { Mascota } from "./Mascota"
import { Usuario } from "./Usuario"

export interface Adopcion{
  idAdopcion?: number,
  idMascota: number,
  idUsuario: number,
  estado: string,
  createdAt?: Date,
  updatedAt?: Date,
  Mascotum: {
    nombreMascota: string,
    Storage: {
      urlStorage:string
    }
  },
  Usuario: {
    nombres: string,
    apellidos:string,
    email: string,
    cedula:String
  }
}

export interface AdopcionesResponse{
  data: Adopcion[]
}
