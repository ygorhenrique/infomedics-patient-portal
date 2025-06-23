import type { Treatment } from "../../types/treatments"
import { apiClient } from "./apiClient"
import { buildApiUrl, API_CONFIG } from "../../config/api"

export const treatmentsClient = {
  async getAllTreatments(): Promise<Treatment[]> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.TREATMENTS)
      const response = await apiClient.get<Treatment[]>(url)

      return response
    } catch (error) {
      console.error("Error fetching all treatments:", error)
      throw error
    }
  },
}
