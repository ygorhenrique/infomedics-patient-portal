export interface Appointment {
  id: string
  patientId: string
  dentistId: string
  treatmentId: string
  appointmentDateTime: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

export interface CreateAppointmentRequest {
  patientId: string
  dentistId: string
  appointmentDateTime: string
  treatmentId: string
  notes?: string
}

export interface UpdateAppointmentRequest extends Partial<CreateAppointmentRequest> {
  id: string
  status?: "scheduled" | "completed" | "cancelled"
}
