export interface PhotoData {
  base64: string
  contentType: string
  fileName: string
}

export interface Patient {
  id: string
  fullName: string
  address: string
  photo?: PhotoData | null
  createdAtUtc: string
}

export interface NewPatientRequest {
  fullName: string
  address: string
  photo: PhotoData | null
}
