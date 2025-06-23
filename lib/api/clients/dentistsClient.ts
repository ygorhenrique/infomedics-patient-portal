import type { Dentist } from "../../types/dentists"
import { apiClient } from "./apiClient"
import { buildApiUrl, API_CONFIG } from "../../config/api"

export const dentistsClient = {
  async getAllDentists(): Promise<Dentist[]> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.DENTISTS)
      const response = await apiClient.get<Dentist[]>(url)

      return response
    } catch (error) {
      console.error(`Error fetching all dentists:`, error)
      throw error
    }
  },
}
