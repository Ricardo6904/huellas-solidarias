export interface Auth{
  email: string,
  clave: string
}

export interface AuthResponse{
  auth: Auth,
  token: string
}
