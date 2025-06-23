import type { Stats } from "../../types/stats"
import { apiClient } from "./apiClient"
import { buildApiUrl, API_CONFIG } from "../../config/api"

export const statsClient = {
  async getStats(): Promise<Stats> {
    try {
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.STATS)
      const response = await apiClient.get<Stats>(url)

      return response
    } catch (error) {
      console.error(`Error fetching stats:`, error)
      throw error
    }
  },
}
