export interface Adopcion{
  id?: number,
  idMascota: number,
  idUsuario: number,
  estado?: string,
  tipo?: string
  createdAt?: Date,
  updatedAt?: Date,
  mascota: {
    nombre: string,
    Storage: {
      url:string
    }
  },
  usuario: {
    nombres: string,
    apellidos:string,
    email: string,
    cedula:String
  }
}

export interface AdopcionesResponse{
  data: Adopcion[]
}
