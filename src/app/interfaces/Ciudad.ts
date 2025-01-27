export interface Ciudad{
    id: number,
    nombre: string,
    idProvincia: number
  }
  
  export interface CiudadesResponse{
   data: Ciudad[]
   support: Support
  }
  
  export interface CiudadResponse{
   data: Ciudad
   support: Support
  }
  
  export interface Support {
    url: string;
    text: string;
  }
  