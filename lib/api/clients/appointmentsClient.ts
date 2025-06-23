// lib/api/clients/stockClient.ts
import { Appointment, Patient } from '@/lib/types';
import { apiClient } from './apiClient';

interface NewAppointmentRequest {
  patientId: string;
  dentistId: string;
  appointmentDateTime: string;
  treatmentId: string;
}

export interface PatientAppointment {
  readonly status: "scheduled" | "completed" | "cancelled";
  patientId: string;
  appointmentId: string;
  appointmentDateTime: string;
  dentistId: string;
  treatmentId: string;
}

export const appointmentsClient = {
  async getAllAppointments(): Promise<Appointment[]> {
    try {
      const url = `http://localhost:5297/appointments`;
      const response = await apiClient.get<Appointment[]>(url);

      return response;
    } catch (error) {
      console.error(`Error fetching all appointments:`, error);
      throw error;
    }
  },

  async getAppointmentsByPatientId(patientId: string): Promise<PatientAppointment[]> {
    try {
      const url = `http://localhost:5297/appointments/${patientId}`;
      const response = await apiClient.get<PatientAppointment[]>(url);

      return response;
    } catch (error) {
      console.error(`Error fetching appointments for patient ${patientId}:`, error);
      throw error;
    }
  },

  async scheduleAppointment(appointmentRequest: NewAppointmentRequest): Promise<Appointment> {
    try {
      const url = `http://localhost:5297/appointments`;
      const response = await apiClient.post<Appointment, NewAppointmentRequest>(url, appointmentRequest);

      return response;
    } catch (error) {
      console.error(`Error scheduling appointment:`, error);
      throw error;
    }
  },
};
