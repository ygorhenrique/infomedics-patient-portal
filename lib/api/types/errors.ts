export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public originalError?: Error,
  ) {
    super(message)
    this.name = "NetworkError"
  }
}

export class ValidationError extends ApiError {
  constructor(
    message: string,
    public validationErrors: Record<string, string[]>,
  ) {
    super(message, 400, "VALIDATION_ERROR", validationErrors)
    this.name = "ValidationError"
  }
}

export type ApiErrorType = ApiError | NetworkError | ValidationError
