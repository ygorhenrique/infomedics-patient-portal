export interface Patient {
  id: string
  fullName: string
  address: string
  photo?: string // File object for the uploaded photo
  createdAtUtc: string
}

export interface Dentist {
  id: string
  name: string
  specialization: string
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
