import type { Treatment } from "../types/treatments"
import { apiClient } from "./apiClient"

export const treatmentsClient = {
  async getAllTreatments(): Promise<Treatment[]> {
    try {
      const url = `http://localhost:5297/treatments`
      const response = await apiClient.get<Treatment[]>(url)

      return response
    } catch (error) {
      console.error("Error fetching all treatments:", error)
      throw error
    }
  },
}
