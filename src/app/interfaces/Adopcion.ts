export interface Adopcion{
  id?: number,
  idAnimalRescatado: number,
  idUsuario: number,
  estado?: string,
  tipo?: string
  createdAt?: Date,
  updatedAt?: Date,
  animalRescatado: {
    nombre: string,
    Storage: {
      url:string
    }
  },
  usuario: {
    nombres: string,
    apellidos:string,
    email: string,
    cedula:String,
    celular: string,
    infoAdicional: string,
    Provincia: {
      nombre: string
    },
    Ciudad: {
      nombre: string
    }
  }
}

export interface AdopcionesResponse{
  data: Adopcion[]
}
