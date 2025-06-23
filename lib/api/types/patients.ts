import type { PhotoData } from "./common"

export interface Patient {
  id: string
  fullName: string
  address: string
  photo: PhotoData | null
  createdAtUtc: string
}

export interface CreatePatientRequest {
  fullName: string
  address: string
  photo: PhotoData | null
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {
  id: string
}
