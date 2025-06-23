// API Configuration
const getApiBaseUrl = (): string => {
  // Check for environment variable first
  if (typeof window !== "undefined") {
    // Client-side: use NEXT_PUBLIC_ prefixed variables
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5297"
  } else {
    // Server-side: can use regular environment variables
    return process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5297"
  }
}

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    PATIENTS: "/patients",
    APPOINTMENTS: "/appointments",
    DENTISTS: "/dentists",
    TREATMENTS: "/treatments",
    STATS: "/stats",
  },
  TIMEOUT: Number.parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
} as const

// Helper function to build full URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
