export interface Adopcion{
  id?: number,
  idMascota: number,
  idUsuario: number,
  estado?: string,
  tipo?: string
  createdAt?: Date,
  updatedAt?: Date,
  Mascotum: {
    nombre: string,
    Storage: {
      url:string
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
