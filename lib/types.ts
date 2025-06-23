export interface Patient {
  id: string
  fullName: string
  address: string
  photo?: string // URL or base64 string for the uploaded photo
  createdAt: string
}

export interface Dentist {
  id: string
  name: string
  specialization: string
}

export interface Treatment {
  id: string
  name: string
  duration: number // in minutes
  price: number
}

export interface Appointment {
  id: string
  patientId: string
  dentistId: string
  treatmentId: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}
