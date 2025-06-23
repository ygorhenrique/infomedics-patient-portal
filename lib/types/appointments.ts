export interface Appointment {
  id: string
  patientId: string
  dentistId: string
  treatmentId: string
  appointmentDateTime: string
  readonly status: "scheduled" | "completed" | "cancelled"
}

export interface NewAppointmentRequest {
  patientId: string
  dentistId: string
  appointmentDateTime: string
  treatmentId: string
}

export interface PatientAppointment {
  readonly status: "scheduled" | "completed" | "cancelled"
  appointmentId: string
  patientId: string
  appointmentDateTime: string
  dentistId: string
  treatmentId: string
}
