"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientCard } from "@/components/patient-card"
import { MobileFilterDropdown } from "@/components/mobile-filter-dropdown"
import { mockPatients, mockAppointments, mockDentists, mockTreatments } from "@/lib/mock-data"
import { Search, Filter, UserPlus, Users, Calendar, Stethoscope, Clock } from "lucide-react"
import Link from "next/link"

const PATIENTS_PER_PAGE = 6

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDate, setFilterDate] = useState("")
  const [filterDentist, setFilterDentist] = useState("all")
  const [filterTreatment, setFilterTreatment] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPatients = useMemo(() => {
    let filtered = mockPatients

    // Search by name or email
    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by appointment date, dentist, or treatment
    if (filterDate || filterDentist !== "all" || filterTreatment !== "all") {
      const relevantAppointments = mockAppointments.filter((apt) => {
        const matchesDate = !filterDate || apt.date === filterDate
        const matchesDentist = filterDentist === "all" || apt.dentistId === filterDentist
        const matchesTreatment = filterTreatment === "all" || apt.treatmentId === filterTreatment
        return matchesDate && matchesDentist && matchesTreatment
      })

      const patientIdsWithMatchingAppointments = new Set(relevantAppointments.map((apt) => apt.patientId))

      filtered = filtered.filter((patient) => patientIdsWithMatchingAppointments.has(patient.id))
    }

    return filtered
  }, [searchTerm, filterDate, filterDentist, filterTreatment])

  const totalPages = Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE)
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * PATIENTS_PER_PAGE,
    currentPage * PATIENTS_PER_PAGE,
  )

  const clearFilters = () => {
    setSearchTerm("")
    setFilterDate("")
    setFilterDentist("all")
    setFilterTreatment("all")
    setCurrentPage(1)
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
        {/* Mobile Title (shown below sticky header) */}
        <div className="sm:hidden mb-4">
          <h1 className="text-header-mobile text-dental-dark font-bold">Patient Management</h1>
          <p className="text-small-mobile text-dental-text-secondary font-medium mt-1">
            Manage patients and appointments
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-mobile-card-gap sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-gradient-to-br from-dental-warm-100/30 to-white border border-dental-warm-200/50 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2 sm:mb-0 sm:pb-2">
              <CardTitle className="text-small-mobile sm:text-small font-semibold text-dental-dark">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-dental-warm" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-dental-warm">{mockPatients.length}</div>
              <p className="text-tiny-mobile sm:text-tiny text-dental-text-secondary mt-mobile-text-gap sm:mt-1">
                Active in system
              </p>
            </CardContent>
          </Card>
          <Card className="dental-stats-card p-4 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2 sm:mb-0 sm:pb-2">
              <CardTitle className="text-small-mobile sm:text-small font-semibold text-dental-dark">
                Scheduled Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-dental-accent" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-dental-primary">
                {mockAppointments.filter((apt) => apt.status === "scheduled").length}
              </div>
              <p className="text-tiny-mobile sm:text-tiny text-dental-text-secondary mt-mobile-text-gap sm:mt-1">
                Upcoming visits
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#A3BFFA]/30 to-white border border-[#A3BFFA]/50 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2 sm:mb-0 sm:pb-2">
              <CardTitle className="text-small-mobile sm:text-small font-semibold text-[#4A4A4A]">
                Today's Appointments
              </CardTitle>
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#4A4A4A]" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-[#4A4A4A]">
                {
                  mockAppointments.filter((apt) => {
                    const today = new Date().toISOString().split("T")[0]
                    return apt.date === today && apt.status === "scheduled"
                  }).length
                }
              </div>
              <p className="text-tiny-mobile sm:text-tiny text-[#4A4A4A]/70 mt-mobile-text-gap sm:mt-1">
                Appointments today
              </p>
            </CardContent>
          </Card>
          <Card className="dental-stats-card p-4 sm:p-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2 sm:mb-0 sm:pb-2">
              <CardTitle className="text-small-mobile sm:text-small font-semibold text-dental-dark">
                Active Dentists
              </CardTitle>
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-dental-accent" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-2xl sm:text-3xl font-bold text-dental-primary">{mockDentists.length}</div>
              <p className="text-tiny-mobile sm:text-tiny text-dental-text-secondary mt-mobile-text-gap sm:mt-1">
                Available practitioners
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="dental-card mb-6">
          <CardHeader className="bg-dental-light/50 rounded-t-xl p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-dental-dark text-body-mobile sm:text-lg">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-dental-warm" />
              Search & Filter
            </CardTitle>
            <CardDescription className="text-small-mobile sm:text-small text-dental-text-secondary mt-mobile-text-gap sm:mt-1">
              Find patients by name, email, or filter by appointment details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-dental-warm" />
              <Input
                placeholder="Search by patient name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-10 text-body-mobile sm:text-base border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-small font-medium text-dental-dark">Appointment Date</Label>
                <Input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-small font-medium text-dental-dark">Dentist</Label>
                <Select value={filterDentist} onValueChange={setFilterDentist}>
                  <SelectTrigger className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0">
                    <SelectValue placeholder="All dentists" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All dentists</SelectItem>
                    {mockDentists.map((dentist) => (
                      <SelectItem key={dentist.id} value={dentist.id}>
                        {dentist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-small font-medium text-dental-dark">Treatment</Label>
                <Select value={filterTreatment} onValueChange={setFilterTreatment}>
                  <SelectTrigger className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0">
                    <SelectValue placeholder="All treatments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All treatments</SelectItem>
                    {mockTreatments.map((treatment) => (
                      <SelectItem key={treatment.id} value={treatment.id}>
                        {treatment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="dental-button-secondary w-full">
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="md:hidden">
              <MobileFilterDropdown
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterDentist={filterDentist}
                setFilterDentist={setFilterDentist}
                filterTreatment={filterTreatment}
                setFilterTreatment={setFilterTreatment}
                clearFilters={clearFilters}
              />
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 sm:mb-6">
          <p className="text-small-mobile sm:text-sm text-dental-text-secondary">
            Showing {paginatedPatients.length} of {filteredPatients.length} patients
          </p>
        </div>

        {/* Patient Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {paginatedPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} appointments={mockAppointments} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                  onClick={() => setCurrentPage(page)}
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
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="text-small-mobile sm:text-sm"
            >
              Next
            </Button>
          </div>
        )}

        {/* No results */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-dental-text-secondary mx-auto mb-4" />
            <h3 className="text-body-mobile sm:text-lg font-semibold mb-2">No patients found</h3>
            <p className="text-small-mobile sm:text-base text-dental-text-secondary mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button className="dental-button-warm-bright text-small-mobile sm:text-sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
