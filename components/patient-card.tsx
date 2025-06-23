import type { Patient, Appointment } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, User } from "lucide-react"
import Link from "next/link"

interface PatientCardProps {
  patient: Patient
  appointments: Appointment[]
}

export function PatientCard({ patient, appointments }: PatientCardProps) {
  const upcomingAppointments = appointments.filter((apt) => apt.patientId === patient.id && apt.status === "scheduled")

  return (
    <Card className="dental-card h-full group">
      <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-2">
          {patient.photo ? (
            <img
              src={patient.photo || "/placeholder.svg"}
              alt={patient.fullName}
              className="w-12 h-12 rounded-full object-cover border-2 border-dental-secondary"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-dental-light border-2 border-dental-secondary flex items-center justify-center">
              <User className="h-6 w-6 text-dental-text-secondary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <CardTitle className="text-body-mobile sm:text-lg font-semibold truncate text-dental-dark group-hover:text-dental-warm transition-colors duration-200">
              {patient.fullName}
            </CardTitle>
            <Badge
              variant="outline"
              className="text-tiny-mobile sm:text-tiny bg-dental-light text-dental-accent border-dental-secondary mt-1"
            >
              ID: {patient.id}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 flex-1 p-4 sm:p-6 pt-0">
        <div className="flex items-start gap-2 text-small-mobile sm:text-small text-dental-text-secondary">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 dental-icon mt-0.5" />
          <span className="line-clamp-2">{patient.address}</span>
        </div>

        {upcomingAppointments.length > 0 && (
          <div className="pt-2 border-t border-dental-secondary/30">
            <div className="flex items-center gap-2 text-small-mobile sm:text-small font-medium mb-1 text-dental-dark">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 dental-icon-warm" />
              <span>Upcoming Appointments</span>
            </div>
            <div className="space-y-1">
              {upcomingAppointments.slice(0, 2).map((apt) => (
                <div
                  key={apt.id}
                  className="text-tiny-mobile sm:text-tiny text-dental-text-secondary bg-dental-light/50 px-2 py-1 rounded"
                >
                  {new Date(apt.date).toLocaleDateString()} at {apt.time}
                </div>
              ))}
              {upcomingAppointments.length > 2 && (
                <div className="text-tiny-mobile sm:text-tiny text-dental-warm font-medium">
                  +{upcomingAppointments.length - 2} more
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 mt-auto">
          <Link href={`/patients/${patient.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="dental-button-secondary w-full h-8 sm:h-9 text-small-mobile sm:text-sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
