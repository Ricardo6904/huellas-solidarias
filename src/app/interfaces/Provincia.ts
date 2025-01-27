export interface Provincia{
  id: number,
  nombre: string,
}

export interface ProvinciasResponse{
 data: Provincia[]
 support: Support
}

export interface ProvinciaResponse{
 data: Provincia
 support: Support
}

export interface Support {
  url: string;
  text: string;
}
