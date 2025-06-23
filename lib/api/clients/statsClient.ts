// lib/api/clients/stockClient.ts
import { apiClient } from './apiClient';

export interface Stats {
  totalPatients: number;
  totalDentists: number;
  totalTreatments: number;
  totalUpcomingAppointments: number;
  totalAppointmentsToday: number;
}

export const statsClient = {
  async getStats(): Promise<Stats> {
    try {
      const url = `http://localhost:5297/stats`;
      const response = await apiClient.get<Stats>(url);

      return response;
    } catch (error) {
      console.error(`Error fetching stast:`, error);
      throw error;
    }
  },
};
