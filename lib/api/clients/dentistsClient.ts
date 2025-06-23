import type { Dentist } from "../../types/dentists"
import { apiClient } from "./apiClient"

export const dentistsClient = {
  async getAllDentists(): Promise<Dentist[]> {
    try {
      const url = `http://localhost:5297/dentists`
      const response = await apiClient.get<Dentist[]>(url)

      return response
    } catch (error) {
      console.error(`Error fetching all dentists:`, error)
      throw error
    }
  },
}
