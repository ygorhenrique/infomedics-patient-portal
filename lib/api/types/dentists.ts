export interface Dentist {
  id: string
  name: string
  specialization?: string
  email?: string
  phone?: string
}

export interface CreateDentistRequest {
  name: string
  specialization?: string
  email?: string
  phone?: string
}
