export interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  emergencyPhone: string
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
