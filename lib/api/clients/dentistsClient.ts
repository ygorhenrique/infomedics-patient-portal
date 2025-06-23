// lib/api/clients/stockClient.ts
import { apiClient } from './apiClient';

export interface Dentist {
  id: string;
  name: string;
}

export const dentistsClient = {
  async getAllDentists(): Promise<Dentist[]> {
    try {
      const url = `http://localhost:5297/dentists`;
      const response = await apiClient.get<Dentist[]>(url);

      return response;
    } catch (error) {
      console.error(`Error fetching all dentists:`, error);
      throw error;
    }
  },
};
