export interface PhotoData {
  base64: string
  contentType: string
  fileName: string
}

export interface Patient {
  id: string
  fullName: string
  address: string
  photo?: PhotoData | null // Updated to match backend structure
  createdAtUtc: string
}

export interface Dentist {
  id: string
  name: string
  specialization: string
}

export type { Stats } from "./api/types/stats"

// Keep any additional app-specific types here
