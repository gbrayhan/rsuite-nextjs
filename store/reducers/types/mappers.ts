import { type AxiosError } from 'axios'
import { type ErrorResponse } from '@/store/reducers/types/http'

export const errorResponseMapper = (error: unknown): ErrorResponse => {
  return {
    message: (error as AxiosError).message,
    status: (error as AxiosError).response?.status,
    code: (error as AxiosError).code
  }
}
