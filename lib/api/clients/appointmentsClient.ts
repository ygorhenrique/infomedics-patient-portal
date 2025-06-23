import type { Appointment, NewAppointmentRequest, PatientAppointment } from "../../types/appointments"
import { apiClient } from "./apiClient"
import { buildApiUrl, API_CONFIG } from "../../config/api"

export const appointmentsClient = {
  async getAllAppointments(): Promise<PatientAppointment[]> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.APPOINTMENTS)
      const response = await apiClient.get<PatientAppointment[]>(url)

      return response
    } catch (error) {
      console.error(`Error fetching all appointments:`, error)
      throw error
    }
  },

  async getAppointmentsByPatientId(patientId: string): Promise<PatientAppointment[]> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.APPOINTMENTS}/${patientId}`)
      const response = await apiClient.get<PatientAppointment[]>(url)

      return response
    } catch (error) {
      console.error(`Error fetching appointments for patient ${patientId}:`, error)
      throw error
    }
  },

  async scheduleAppointment(appointmentRequest: NewAppointmentRequest): Promise<Appointment> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.APPOINTMENTS)
      const response = await apiClient.post<Appointment, NewAppointmentRequest>(url, appointmentRequest)

      return response
    } catch (error) {
      console.error(`Error scheduling appointment:`, error)
      throw error
    }
  },
}
