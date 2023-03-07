
export interface ErrorResponse {
  message: string
  status: number | undefined
  code: string | undefined
}

export type ObjectFormType = Record<string, string | Blob>

export interface HttpResponse<T> {
  data: T
  status: number
  headers?: Record<string, string>
}
