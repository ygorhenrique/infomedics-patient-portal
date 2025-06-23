"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AppointmentForm } from "@/components/appointment-form"
import { ArrowLeft, User, MapPin, Calendar, Clock, Stethoscope } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DentalLogo } from "@/components/dental-logo"
import { patientsClient } from "@/lib/api/clients/patientsClient"
import type { Patient } from "@/lib/types"
import { appointmentsClient, type PatientAppointment } from "@/lib/api/clients/appointmentsClient"
import { treatmentsClient } from "@/lib/api/clients/treatmentsClient"
import { dentistsClient } from "@/lib/api/clients/dentistsClient"

interface PageData {
  patient: Patient | null
  appointments: PatientAppointment[]
  treatments: { id: string; name: string }[]
  dentists: { id: string; name: string }[]
}

export default function PatientDetailPage() {
  const params = useParams<{ id: string }>()
  const patientId = params.id

  const [data, setData] = useState<PageData | null>(null) // Initialize as null
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    if (!patientId) {
      setError("Patient ID is required")
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const [patient, appointments, treatments, dentists] = await Promise.all([
        patientsClient.getPatientById(patientId),
        appointmentsClient.getAppointmentsByPatientId(patientId),
        treatmentsClient.getAllTreatments(),
        dentistsClient.getAllDentists(),
      ])

      setData({
        patient,
        appointments,
        treatments,
        dentists,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load patient data")
    } finally {
      setIsLoading(false)
    }
  }, [patientId])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleAppointmentCreated = useCallback(() => {
    loadData()
  }, [loadData])

  const { upcomingAppointments, pastAppointments } = useMemo(() => {
    if (!data) {
      return { upcomingAppointments: [], pastAppointments: [] }
    }
    const now = new Date()

    const upcoming = data.appointments
      .filter((apt) => new Date(apt.appointmentDateTime) >= now)
      .sort((a, b) => new Date(a.appointmentDateTime).getTime() - new Date(b.appointmentDateTime).getTime())

    const past = data.appointments
      .filter((apt) => new Date(apt.appointmentDateTime) < now)
      .sort((a, b) => new Date(b.appointmentDateTime).getTime() - new Date(a.appointmentDateTime).getTime())

    return { upcomingAppointments: upcoming, pastAppointments: past }
  }, [data])

  const getDentistName = useCallback(
    (dentistId: string) => {
      return data!.dentists.find((d) => d.id === dentistId)?.name || "Unknown"
    },
    [data],
  )

  const getTreatmentName = useCallback(
    (treatmentId: string) => {
      return data!.treatments.find((t) => t.id === treatmentId)?.name || "Unknown"
    },
    [data],
  )

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-dental-warm-100 text-dental-warm-700"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  const formatAppointmentDate = useCallback((appointmentDateTime: string) => {
    return new Date(appointmentDateTime).toLocaleDateString()
  }, [])

  const formatAppointmentTime = useCallback((appointmentDateTime: string) => {
    return new Date(appointmentDateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dental-warm-600 mx-auto mb-4"></div>
            <p className="text-dental-text-secondary">Loading patient data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={loadData} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data || !data.patient) {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-dental-text-secondary">Patient not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6 px-2 sm:px-0">
        <div className="flex items-center gap-4 mb-4">
          <DentalLogo />
        </div>
        <Link href="/">
          <Button variant="ghost" className="gap-2 mb-4 hover:bg-dental-light transition-colors duration-200">
            <ArrowLeft className="h-4 w-4 dental-icon-warm" />
            <span className="text-dental-dark">Back to Patients</span>
          </Button>
        </Link>
      </div>

      {/* Patient Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="dental-card">
            <CardHeader className="bg-dental-light/50 rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  {data.patient.photo ? (
                    <img
                      src={data.patient.photo || "/placeholder.svg"}
                      alt={data.patient.fullName}
                      className="w-16 h-16 rounded-full object-cover border-2 border-dental-secondary"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-dental-light border-2 border-dental-secondary flex items-center justify-center">
                      <User className="h-8 w-8 text-dental-text-secondary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2 text-dental-dark">
                      {data.patient.fullName}
                    </CardTitle>
                    <CardDescription className="text-small text-dental-text-secondary">
                      Patient ID: {data.patient.id}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-dental-warm-100 text-dental-warm-700 border-dental-warm-200">
                  Active Patient
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-dental-text-secondary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-dental-dark">Address</p>
                  <p className="text-sm text-dental-text-secondary">{data.patient.address}</p>
                </div>
              </div>
              <Separator />
              <div className="text-sm text-dental-text-secondary">
                <span className="font-medium text-dental-dark">Patient since:</span>{" "}
                {new Date(data.patient.createdAtUtc).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="dental-card">
            <CardHeader className="bg-dental-light/50 rounded-t-xl">
              <CardTitle className="text-lg text-dental-dark">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-6">
              <AppointmentForm
                patientId={data.patient.id}
                patientName={data.patient.fullName}
                onAppointmentCreated={handleAppointmentCreated}
              />
              <Button variant="outline" className="dental-button-secondary w-full">
                Edit Patient Info
              </Button>
              <Button variant="outline" className="dental-button-secondary w-full">
                View Medical History
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="dental-card">
          <CardHeader className="bg-dental-light/50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-dental-dark">
              <Calendar className="h-5 w-5 dental-icon-warm" />
              Upcoming Appointments
            </CardTitle>
            <CardDescription className="text-small text-dental-text-secondary">
              {upcomingAppointments.length} scheduled appointment{upcomingAppointments.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-dental-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      <span className="text-sm text-dental-text-secondary">
                        {formatAppointmentDate(appointment.appointmentDateTime)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-dental-text-secondary">
                        <Clock className="h-4 w-4" />
                        <span>{formatAppointmentTime(appointment.appointmentDateTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-dental-text-secondary">
                        <User className="h-4 w-4" />
                        <span>{getDentistName(appointment.dentistId)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-dental-text-secondary">
                        <Stethoscope className="h-4 w-4" />
                        <span>{getTreatmentName(appointment.treatmentId)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-dental-text-secondary mx-auto mb-4" />
                <p className="text-dental-text-secondary">No upcoming appointments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Appointments */}
        <Card className="dental-card">
          <CardHeader className="bg-dental-light/50 rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-dental-dark">
              <Clock className="h-5 w-5 dental-icon" />
              Appointment History
            </CardTitle>
            <CardDescription className="text-small text-dental-text-secondary">
              Previous appointments and treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pastAppointments.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-dental-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <span className="text-sm text-dental-text-secondary">
                        {formatAppointmentDate(appointment.appointmentDateTime)}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-dental-text-secondary">
                        <Clock className="h-4 w-4" />
                        <span>{formatAppointmentTime(appointment.appointmentDateTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-dental-text-secondary">
                        <User className="h-4 w-4" />
                        <span>{getDentistName(appointment.dentistId)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-dental-text-secondary">
                        <Stethoscope className="h-4 w-4" />
                        <span>{getTreatmentName(appointment.treatmentId)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-dental-text-secondary mx-auto mb-4" />
                <p className="text-dental-text-secondary">No appointment history</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}