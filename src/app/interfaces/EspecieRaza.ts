export interface Especie {
  id: number;
  nombre: string;
}

export interface EspeciesResponse {
  data: Especie[];
  support: Support;
}

export interface EspecieResponse {
  data: Especie;
  support: Support;
}

export interface Raza {
  id: number;
  nombre: string;
  idEspecie: number;
}

export interface RazasResponse {
  data: Raza[];
  support: Support;
}

export interface RazaResponse {
  data: Raza;
  support: Support;
}

export interface Support {
  url: string;
  text: string;
}
