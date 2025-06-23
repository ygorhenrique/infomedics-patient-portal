export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PhotoData {
  base64: string
  contentType: string
  fileName: string
}

export interface RequestOptions {
  signal?: AbortSignal
  timeout?: number
  retries?: number
}
