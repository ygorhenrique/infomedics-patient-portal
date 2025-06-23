import type { Patient, NewPatientRequest } from "../../types/patients"
import { apiClient } from "./apiClient"
import { buildApiUrl, API_CONFIG } from "../../config/api"

export const patientsClient = {
  async addPatient(patientRequest: NewPatientRequest): Promise<Patient> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)
      const response = await apiClient.post<Patient, NewPatientRequest>(url, patientRequest)

      return response
    } catch (error) {
      console.error(`Error adding patient ${patientRequest.fullName}:`, error)
      throw error
    }
  },

  async getPatientById(patientId: string): Promise<Patient> {
    try {
      const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.PATIENTS}/${patientId}`)
      const response = await apiClient.get<Patient>(url)

      return response
    } catch (error) {
      console.error(`Error fetching patient ${patientId}:`, error)
      throw error
    }
  },

  async getAllPatients(): Promise<Patient[]> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.PATIENTS)
      const response = await apiClient.get<Patient[]>(url)

      return response
    } catch (error) {
      console.error(`Error fetching all patients:`, error)
      throw error
    }
  },
}
