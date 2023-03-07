export interface LoginResponse {
  data: {
    userName: string
    email: string
    firstName: string
    lastName: string
    status: boolean
    role: string
    id: number
  }
  security: {
    jwtAccessToken: string
    jwtRefreshToken: string
    expirationAccessTime: string
    expirationRefreshTime: string
  }
}
