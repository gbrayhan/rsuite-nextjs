import axios, { type AxiosResponse } from 'axios'
import { BACKEND_URL } from '@/const/env'
import { type LoginResponse } from '@/store/reducers/User/api/types'

export async function loginAPI (email: string, password: string): Promise<LoginResponse> {
  const data = { email, password }
  return await axios({
    url: `${String(BACKEND_URL)}/auth/login`,
    method: 'post',
    data,
    timeout: 4000,
    headers: {
      'content-type': 'application/json'
    }
  }).then((response: AxiosResponse<LoginResponse>) => {
    return response.data
  })
}

export async function accessTokenByRefreshTokenAPI (refreshToken: string): Promise<LoginResponse> {
  const data = { refreshToken }

  return await axios({
    method: 'post',
    data,
    headers: {
      'content-type': 'application/json'
    },
    url: `${String(BACKEND_URL)}/api/auth/refresh`
  }).then((response: AxiosResponse<LoginResponse>) => response.data)
}
