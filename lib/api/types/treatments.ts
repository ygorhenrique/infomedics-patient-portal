export interface Treatment {
  id: string
  name: string
  description?: string
  duration?: number
  price?: number
}

export interface CreateTreatmentRequest {
  name: string
  description?: string
  duration?: number
  price?: number
}
