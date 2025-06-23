import type { Stats } from "../../types/stats"
import { apiClient } from "./apiClient"

export const statsClient = {
  async getStats(): Promise<Stats> {
    try {
      const url = `http://localhost:5297/stats`
      const response = await apiClient.get<Stats>(url)

      return response
    } catch (error) {
      console.error(`Error fetching stats:`, error)
      throw error
    }
  },
}
