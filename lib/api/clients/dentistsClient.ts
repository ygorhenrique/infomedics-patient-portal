import { baseApiClient } from "./baseApiClient"
import { API_ENDPOINTS } from "../config"
import type { Dentist, CreateDentistRequest } from "../types/dentists"
import type { RequestOptions } from "../types/common"

export class DentistsClient {
  async getAll(options?: RequestOptions): Promise<Dentist[]> {
    return baseApiClient.get<Dentist[]>(API_ENDPOINTS.dentists, options)
  }

  async getById(id: string, options?: RequestOptions): Promise<Dentist> {
    return baseApiClient.get<Dentist>(`${API_ENDPOINTS.dentists}/${id}`, options)
  }

  async create(data: CreateDentistRequest, options?: RequestOptions): Promise<Dentist> {
    return baseApiClient.post<Dentist, CreateDentistRequest>(API_ENDPOINTS.dentists, data, options)
  }
}

export const dentistsClient = new DentistsClient()
