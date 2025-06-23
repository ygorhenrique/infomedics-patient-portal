"use client"

import type React from "react"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientCard } from "@/components/patient-card"
import { UserPlus, Users, Stethoscope, Clock, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import { appointmentsClient } from "@/lib/api/clients/appointmentsClient"
import { patientsClient } from "@/lib/api/clients/patientsClient"
import {  statsClient } from "@/lib/api/clients/statsClient"
import { Patient, PatientAppointment, Stats } from "@/lib/types/index"

const PATIENTS_PER_PAGE = 6

// Custom hook for data fetching
function usePatientManagementData() {
  const [data, setData] = useState<{
    patients: Patient[]
    appointments: PatientAppointment[]
    stats: Stats | null
  }>({
    patients: [],
    appointments: [],
    stats: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [appointments, patients, stats] = await Promise.all([
        appointmentsClient.getAllAppointments(),
        patientsClient.getAllPatients(),
        statsClient.getStats(),
      ])

      setData({ patients, appointments, stats })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { ...data, loading, error, refetch: fetchData }
}

// Stats card component
interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  className?: string
}

function StatsCard({ title, value, icon, className = "" }: StatsCardProps) {
  return (
    <Card className={`p-4 sm:p-6 hover:shadow-md transition-all duration-200 ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2 sm:mb-0 sm:pb-2">
        <CardTitle className="text-small-mobile sm:text-small font-semibold text-dental-dark">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-2xl sm:text-3xl font-bold text-dental-warm">{value}</div>
      </CardContent>
    </Card>
  )
}

// Pagination component
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-small-mobile sm:text-sm"
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={`text-small-mobile sm:text-sm ${
              currentPage === page ? "bg-dental-warm hover:bg-dental-warm-dark text-white" : ""
            }`}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-small-mobile sm:text-sm"
      >
        Next
      </Button>
    </div>
  )
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-8 sm:py-12">
      <Users className="h-10 w-10 sm:h-12 sm:w-12 text-dental-text-secondary mx-auto mb-4" />
      <h3 className="text-body-mobile sm:text-lg font-semibold mb-2">No patients found</h3>
      <p className="text-small-mobile sm:text-base text-dental-text-secondary mb-4">
        Get started by adding your first patient
      </p>
      <Link href="/patients/new">
        <Button className="dental-button-warm-bright text-small-mobile sm:text-sm">Add First Patient</Button>
      </Link>
    </div>
  )
}

// Loading state component
function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-dental-warm" />
        <span className="text-dental-text-secondary">Loading patients...</span>
      </div>
    </div>
  )
}

// Error state component
interface ErrorStateProps {
  error: string
  onRetry: () => void
}

function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-8 sm:py-12">
      <div className="text-red-500 mb-4">
        <h3 className="text-body-mobile sm:text-lg font-semibold mb-2">Error loading data</h3>
        <p className="text-small-mobile sm:text-base">{error}</p>
      </div>
      <Button onClick={onRetry} variant="outline">
        Try Again
      </Button>
    </div>
  )
}

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { patients, appointments, stats, loading, error, refetch } = usePatientManagementData()

  // Memoized calculations
  const { totalPages, paginatedPatients } = useMemo(() => {
    const totalPages = Math.ceil(patients.length / PATIENTS_PER_PAGE)
    const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE
    const endIndex = startIndex + PATIENTS_PER_PAGE
    const paginatedPatients = patients.slice(startIndex, endIndex)

    return { totalPages, paginatedPatients }
  }, [patients, currentPage])

  // Reset to first page when patients change
  useEffect(() => {
    setCurrentPage(1)
  }, [patients.length])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingState />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-mobile-header sm:h-auto sm:py-6">
            <div className="flex items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-dental-warm p-1.5 sm:p-2 rounded-lg shadow-md">
                  <Stethoscope className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm sm:text-lg text-dental-dark">DentalCare</span>
                  <span className="text-xs text-gray-500 font-medium hidden sm:block">Practice Management</span>
                </div>
              </div>
              <div className="border-l border-gray-200 pl-3 sm:pl-6 hidden sm:block">
                <h1 className="text-header-mobile sm:text-header text-dental-dark font-bold">Patient Management</h1>
                <p className="text-small-mobile sm:text-small text-dental-text-secondary font-medium">
                  Manage patients and appointments for your dental practice
                </p>
              </div>
            </div>
            <Link href="/patients/new">
              <Button className="dental-button-warm-bright gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 text-xs sm:text-sm">
                <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Add New Patient</span>
                <span className="xs:hidden">Add</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Mobile Title */}
        <div className="sm:hidden mb-4">
          <h1 className="text-header-mobile text-dental-dark font-bold">Patient Management</h1>
          <p className="text-small-mobile text-dental-text-secondary font-medium mt-1">
            Manage patients and appointments
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-mobile-card-gap sm:gap-6 mb-6 sm:mb-8">
          <StatsCard
            title="Total Patients"
            value={stats?.totalPatients || 0}
            icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 text-dental-warm" />}
            className="bg-gradient-to-br from-dental-warm-100/30 to-white border border-dental-warm-200/50 rounded-xl"
          />
          <StatsCard
            title="Scheduled Appointments"
            value={stats?.totalUpcomingAppointments || 0}
            icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-dental-accent" />}
            className="dental-stats-card"
          />
          <StatsCard
            title="Today's Appointments"
            value={stats?.totalAppointmentsToday || 0}
            icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#4A4A4A]" />}
            className="bg-gradient-to-br from-[#A3BFFA]/30 to-white border border-[#A3BFFA]/50 rounded-xl"
          />
          <StatsCard
            title="Active Dentists"
            value={stats?.totalDentists || 0}
            icon={<Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-dental-accent" />}
            className="dental-stats-card"
          />
        </div>

        {/* Results Summary */}
        <div className="mb-4 sm:mb-6">
          <p className="text-small-mobile sm:text-sm text-dental-text-secondary">
            Showing {paginatedPatients.length} of {patients.length} patients
          </p>
        </div>

        {/* Patient Grid */}
        {patients.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {paginatedPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} appointments={appointments} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </div>
    </div>
  )
}
