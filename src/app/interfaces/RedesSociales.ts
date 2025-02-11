export interface RedesSociales{
    id: number,
    nombre: string,
    url: string
  }
  
  export interface RedesSocialesResponse{
   data: RedesSociales[]
   support: Support
  }
  
  export interface RedSocialResponse{
   data: RedesSociales
   support: Support
  }
  
  export interface Support {
    url: string;
    text: string;
  }
  