// lib/api/clients/stockClient.ts
import type { Patient } from "@/lib/types"
import { apiClient } from "./apiClient"

export interface PhotoData {
  base64: string
  contentType: string
  fileName: string
}

export interface NewPatientRequest {
  fullName: string
  address: string
  photo: PhotoData | null // Include content type and metadata
}

export const patientsClient = {
  async addPatient(patientRequest: NewPatientRequest): Promise<Patient> {
    try {
      const url = `http://localhost:5297/patients`
      const response = await apiClient.post<Patient, NewPatientRequest>(url, patientRequest)

      return response
    } catch (error) {
      console.error(`Error adding patient ${patientRequest.fullName}:`, error)
      throw error
    }
  },

  async getPatientById(patientId: string): Promise<Patient> {
    try {
      const url = `http://localhost:5297/patients/${patientId}`
      const response = await apiClient.get<Patient>(url)

      return response
    } catch (error) {
      console.error(`Error fetching patient ${patientId}:`, error)
      throw error
    }
  },

  async getAllPatients(): Promise<Patient[]> {
    try {
      const url = `http://localhost:5297/patients`
      const response = await apiClient.get<Patient[]>(url)

      return response
    } catch (error) {
      console.error(`Error fetching all patients:`, error)
      throw error
    }
  },
}
