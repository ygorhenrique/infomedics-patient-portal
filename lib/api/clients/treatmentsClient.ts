import { baseApiClient } from "./baseApiClient"
import { API_ENDPOINTS } from "../config"
import type { Treatment, CreateTreatmentRequest } from "../types/treatments"
import type { RequestOptions } from "../types/common"

export class TreatmentsClient {
  async getAll(options?: RequestOptions): Promise<Treatment[]> {
    return baseApiClient.get<Treatment[]>(API_ENDPOINTS.treatments, options)
  }

  async getById(id: string, options?: RequestOptions): Promise<Treatment> {
    return baseApiClient.get<Treatment>(`${API_ENDPOINTS.treatments}/${id}`, options)
  }

  async create(data: CreateTreatmentRequest, options?: RequestOptions): Promise<Treatment> {
    return baseApiClient.post<Treatment, CreateTreatmentRequest>(API_ENDPOINTS.treatments, data, options)
  }
}

export const treatmentsClient = new TreatmentsClient()
