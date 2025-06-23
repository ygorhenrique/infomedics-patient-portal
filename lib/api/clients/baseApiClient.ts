import { API_CONFIG } from "../config"
import { ApiError, NetworkError, ValidationError } from "../types/errors"
import type { RequestOptions } from "../types/common"

interface RequestConfig extends RequestInit {
  timeout?: number
  retries?: number
}

class BaseApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor(baseUrl: string = API_CONFIG.baseUrl) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      "Content-Type": "application/json",
    }
  }

  private getAuthHeaders(): Record<string, string> {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private async fetchWithTimeout(url: string, options: RequestConfig): Promise<Response> {
    const { timeout = API_CONFIG.timeout, ...fetchOptions } = options

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)
      return response
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === "AbortError") {
        throw new NetworkError("Request timeout")
      }
      throw error
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type")
    const isJson = contentType?.includes("application/json")

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`
      let errorDetails: unknown

      if (isJson) {
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          errorDetails = errorData.details || errorData.errors

          // Handle validation errors
          if (response.status === 400 && errorData.errors) {
            throw new ValidationError(errorMessage, errorData.errors)
          }
        } catch (parseError) {
          // If JSON parsing fails, use the default error message
        }
      }

      throw new ApiError(errorMessage, response.status, undefined, errorDetails)
    }

    if (!isJson) {
      throw new ApiError("Expected JSON response", response.status)
    }

    try {
      return await response.json()
    } catch (error) {
      throw new ApiError("Invalid JSON response", response.status)
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestConfig = {}): Promise<T> {
    const { retries = API_CONFIG.retryAttempts, ...requestOptions } = options
    const url = `${this.baseUrl}${endpoint}`

    const headers = {
      ...this.defaultHeaders,
      ...this.getAuthHeaders(),
      ...options.headers,
    }

    let lastError: Error

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, {
          ...requestOptions,
          headers,
        })

        return await this.handleResponse<T>(response)
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unknown error")

        // Don't retry on client errors (4xx) except for 408, 429
        if (error instanceof ApiError) {
          const shouldRetry = error.status === 408 || error.status === 429 || error.status >= 500
          if (!shouldRetry || attempt === retries) {
            throw error
          }
        }

        // Don't retry validation errors
        if (error instanceof ValidationError) {
          throw error
        }

        // Wait before retrying
        if (attempt < retries) {
          await this.delay(API_CONFIG.retryDelay * Math.pow(2, attempt))
        }
      }
    }

    throw new NetworkError("Max retries exceeded", lastError)
  }

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "GET",
      signal: options?.signal,
      timeout: options?.timeout,
      retries: options?.retries,
    })
  }

  async post<T, U = unknown>(endpoint: string, data?: U, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      signal: options?.signal,
      timeout: options?.timeout,
      retries: options?.retries,
    })
  }

  async put<T, U = unknown>(endpoint: string, data: U, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      signal: options?.signal,
      timeout: options?.timeout,
      retries: options?.retries,
    })
  }

  async patch<T, U = unknown>(endpoint: string, data: U, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      signal: options?.signal,
      timeout: options?.timeout,
      retries: options?.retries,
    })
  }

  async delete<T = void>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: "DELETE",
      signal: options?.signal,
      timeout: options?.timeout,
      retries: options?.retries,
    })
  }
}

export const baseApiClient = new BaseApiClient()
