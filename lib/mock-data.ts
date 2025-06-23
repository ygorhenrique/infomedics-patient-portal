import type { Patient, Dentist, Treatment, Appointment } from "./types"

export const mockDentists: Dentist[] = [
  { id: "1", name: "Dr. Sarah Johnson", specialization: "General Dentistry" },
  { id: "2", name: "Dr. Michael Chen", specialization: "Orthodontics" },
  { id: "3", name: "Dr. Emily Rodriguez", specialization: "Oral Surgery" },
  { id: "4", name: "Dr. David Thompson", specialization: "Periodontics" },
]

export const mockTreatments: Treatment[] = [
  { id: "1", name: "Regular Cleaning", duration: 60, price: 120 },
  { id: "2", name: "Dental Filling", duration: 90, price: 180 },
  { id: "3", name: "Root Canal Treatment", duration: 120, price: 800 },
  { id: "4", name: "Teeth Whitening", duration: 45, price: 300 },
]

export const mockPatients: Patient[] = [
  {
    id: "1",
    fullName: "John Smith",
    address: "123 Main St, Anytown, ST 12345",
    photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    fullName: "Maria Garcia",
    address: "456 Oak Ave, Somewhere, ST 67890",
    photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    fullName: "Robert Johnson",
    address: "789 Pine Rd, Elsewhere, ST 13579",
    photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-28",
  },
  {
    id: "4",
    fullName: "Lisa Anderson",
    address: "321 Elm St, Nowhere, ST 24680",
    photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    fullName: "Michael Brown",
    address: "654 Maple Dr, Anywhere, ST 97531",
    photo: "/placeholder.svg?height=100&width=100",
    createdAt: "2024-01-20",
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    dentistId: "1",
    treatmentId: "1",
    date: "2024-12-28",
    time: "09:00",
    status: "scheduled",
    notes: "Regular checkup",
  },
  {
    id: "2",
    patientId: "2",
    dentistId: "2",
    treatmentId: "2",
    date: "2024-12-29",
    time: "14:30",
    status: "scheduled",
    notes: "Cavity filling",
  },
  {
    id: "3",
    patientId: "3",
    dentistId: "3",
    treatmentId: "3",
    date: "2024-12-30",
    time: "10:15",
    status: "scheduled",
    notes: "Root canal procedure",
  },
  {
    id: "4",
    patientId: "1",
    dentistId: "1",
    treatmentId: "4",
    date: "2025-01-05",
    time: "11:00",
    status: "scheduled",
    notes: "Whitening treatment",
  },
]
