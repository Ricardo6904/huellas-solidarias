import { Refugio } from "./Refugio";

export interface Mascota {
  id: number,
  nombre: string,
  idEspecie: string,
  idRaza: string,
  edad: string,
  sexo: string,
  tamano: string,
  descripcion: string,
  estado: string,
  urlQR: number,
  idStorage: number,
  Storage: {
    url: string
  },
  idUsuario: number,
  Usuario: {
    nombres: string,
    apellidos: string,
    celular: string,
    email:string
  },
  raza: {
    id: 0,
    nombre: ''
  },
  especie: {
    id: 0,
    nombre: ''
  }
}

export interface MascotasResponse {
  currentPage: number;
  total: number;
  totalPages: number;
  data: Mascota[];
  support: Support;
}

export interface MascotaResponse {
  data: Mascota;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
export function getDefaultMascota(): Mascota {
  return {
    id: 0,
    nombre: '',
    idEspecie: '',
    idRaza: '',
    edad: '',
    sexo: '',
    tamano: '',
    descripcion: '',
    estado: '',
    urlQR: 0,
    idStorage: 0,
    Storage: {
      url: '',
    },
    idUsuario: 0,
    Usuario: {
      nombres: '',
      apellidos: '',
      celular: '',
      email: '',
    },
    raza: {
      id: 0,
      nombre: ''
    },
    especie: {
      id: 0,
      nombre: ''
    }
  };
}
