import { baseApiClient } from "./baseApiClient"
import { API_ENDPOINTS } from "../config"
import type { Appointment, CreateAppointmentRequest, UpdateAppointmentRequest } from "../types/appointments"
import type { RequestOptions } from "../types/common"

export class AppointmentsClient {
  async getAll(options?: RequestOptions): Promise<Appointment[]> {
    return baseApiClient.get<Appointment[]>(API_ENDPOINTS.appointments, options)
  }

  async getById(id: string, options?: RequestOptions): Promise<Appointment> {
    return baseApiClient.get<Appointment>(`${API_ENDPOINTS.appointments}/${id}`, options)
  }

  async getByPatientId(patientId: string, options?: RequestOptions): Promise<Appointment[]> {
    return baseApiClient.get<Appointment[]>(`${API_ENDPOINTS.appointments}/patient/${patientId}`, options)
  }

  async create(data: CreateAppointmentRequest, options?: RequestOptions): Promise<Appointment> {
    return baseApiClient.post<Appointment, CreateAppointmentRequest>(API_ENDPOINTS.appointments, data, options)
  }

  async update(data: UpdateAppointmentRequest, options?: RequestOptions): Promise<Appointment> {
    const { id, ...updateData } = data
    return baseApiClient.put<Appointment, Omit<UpdateAppointmentRequest, "id">>(
      `${API_ENDPOINTS.appointments}/${id}`,
      updateData,
      options,
    )
  }

  async delete(id: string, options?: RequestOptions): Promise<void> {
    return baseApiClient.delete<void>(`${API_ENDPOINTS.appointments}/${id}`, options)
  }

  async getUpcoming(options?: RequestOptions): Promise<Appointment[]> {
    return baseApiClient.get<Appointment[]>(`${API_ENDPOINTS.appointments}/upcoming`, options)
  }

  async getToday(options?: RequestOptions): Promise<Appointment[]> {
    return baseApiClient.get<Appointment[]>(`${API_ENDPOINTS.appointments}/today`, options)
  }
}

export const appointmentsClient = new AppointmentsClient()
