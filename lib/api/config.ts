export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5297",
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const

export const API_ENDPOINTS = {
  patients: "/patients",
  appointments: "/appointments",
  dentists: "/dentists",
  treatments: "/treatments",
  stats: "/stats",
} as const
