"use client"

import { useEffect, useState } from "react"
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

export default function PatientDetailPage() {
  const params = useParams<{ id: string }>()

  const [refreshKey, setRefreshKey] = useState(0)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [patientAppointments, setPatientAppointments] = useState<PatientAppointment[]>([])
  const [treatments, setTreatments] = useState<{ id: string; name: string }[]>([])
  const [dentists, setDentists] = useState<{ id: string; name: string }[]>([])

  const loadData = async () => {
    if (!params.id) {
      throw new Error("Patient ID is required")
    }

    const [patient, patientAppointments, treatments, dentists] = await Promise.all([
      patientsClient.getPatientById(params.id),
      appointmentsClient.getAppointmentsByPatientId(params.id),
      treatmentsClient.getAllTreatments(),
      dentistsClient.getAllDentists(),
    ])

    setPatient(patient)
    setPatientAppointments(patientAppointments)
    setTreatments(treatments)
    setDentists(dentists)
  }

  useEffect(() => {
    loadData()
  }, [params.id, refreshKey])

  const upcomingAppointments = patientAppointments
    .filter((apt) => {
      const appointmentDateTime = new Date(apt.appointmentDateTime)
      return appointmentDateTime >= new Date()
    })
    .sort((a, b) => {
      const dateA = new Date(a.appointmentDateTime)
      const dateB = new Date(b.appointmentDateTime)
      return dateA.getTime() - dateB.getTime()
    })

  const pastAppointments = patientAppointments
    .filter((apt) => {
      const appointmentDateTime = new Date(apt.appointmentDateTime)
      return appointmentDateTime < new Date()
    })
    .sort((a, b) => {
      const dateA = new Date(a.appointmentDateTime)
      const dateB = new Date(b.appointmentDateTime)
      return dateB.getTime() - dateA.getTime()
    })

  const getDentistName = (dentistId: string) => {
    return dentists.find((d) => d.id === dentistId)?.name || "Unknown"
  }

  const getTreatmentName = (treatmentId: string) => {
    return treatments.find((t) => t.id === treatmentId)?.name || "Unknown"
  }

  const getStatusColor = (status: string) => {
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
  }

  const formatAppointmentDate = (appointmentDateTime: string) => {
    return new Date(appointmentDateTime).toLocaleDateString()
  }

  const formatAppointmentTime = (appointmentDateTime: string) => {
    return new Date(appointmentDateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    patient !== null && (
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
                    {patient.photo ? (
                      <img
                        src={patient.photo || "/placeholder.svg"}
                        alt={patient.fullName}
                        className="w-16 h-16 rounded-full object-cover border-2 border-dental-secondary"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-dental-light border-2 border-dental-secondary flex items-center justify-center">
                        <User className="h-8 w-8 text-dental-text-secondary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2 text-dental-dark">
                        {patient.fullName}
                      </CardTitle>
                      <CardDescription className="text-small text-dental-text-secondary">
                        Patient ID: {patient.id}
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
                    <p className="text-sm text-dental-text-secondary">{patient.address}</p>
                  </div>
                </div>
                <Separator />
                <div className="text-sm text-dental-text-secondary">
                  <span className="font-medium text-dental-dark">Patient since:</span>{" "}
                  {new Date(patient.createdAt).toLocaleDateString()}
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
                  patientId={patient.id}
                  patientName={patient.fullName}
                  onAppointmentCreated={() => setRefreshKey((prev) => prev + 1)}
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
  )
}
