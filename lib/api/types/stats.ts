export interface DashboardStats {
  totalPatients: number
  totalDentists: number
  totalTreatments: number
  totalUpcomingAppointments: number
  totalAppointmentsToday: number
  recentActivity?: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: "appointment" | "patient" | "treatment"
  description: string
  timestamp: string
}
