import { baseApiClient } from "./baseApiClient"
import { API_ENDPOINTS } from "../config"
import type { Patient, CreatePatientRequest, UpdatePatientRequest } from "../types/patients"
import type { RequestOptions } from "../types/common"

export class PatientsClient {
  async getAll(options?: RequestOptions): Promise<Patient[]> {
    return baseApiClient.get<Patient[]>(API_ENDPOINTS.patients, options)
  }

  async getById(id: string, options?: RequestOptions): Promise<Patient> {
    return baseApiClient.get<Patient>(`${API_ENDPOINTS.patients}/${id}`, options)
  }

  async create(data: CreatePatientRequest, options?: RequestOptions): Promise<Patient> {
    return baseApiClient.post<Patient, CreatePatientRequest>(API_ENDPOINTS.patients, data, options)
  }

  async update(data: UpdatePatientRequest, options?: RequestOptions): Promise<Patient> {
    const { id, ...updateData } = data
    return baseApiClient.put<Patient, Omit<UpdatePatientRequest, "id">>(
      `${API_ENDPOINTS.patients}/${id}`,
      updateData,
      options,
    )
  }

  async delete(id: string, options?: RequestOptions): Promise<void> {
    return baseApiClient.delete<void>(`${API_ENDPOINTS.patients}/${id}`, options)
  }

  async search(query: string, options?: RequestOptions): Promise<Patient[]> {
    return baseApiClient.get<Patient[]>(`${API_ENDPOINTS.patients}/search?q=${encodeURIComponent(query)}`, options)
  }
}

export const patientsClient = new PatientsClient()
