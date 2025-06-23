"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { dentistsClient } from "@/lib/api/clients/dentistsClient"
import { treatmentsClient } from "@/lib/api/clients/treatmentsClient"

interface MobileFilterDropdownProps {
  filterDate: string
  setFilterDate: (date: string) => void
  filterDentist: string
  setFilterDentist: (dentist: string) => void
  filterTreatment: string
  setFilterTreatment: (treatment: string) => void
  clearFilters: () => void
}

interface Dentist {
  id: string
  name: string
}

interface Treatment {
  id: string
  name: string
}

export function MobileFilterDropdown({
  filterDate,
  setFilterDate,
  filterDentist,
  setFilterDentist,
  filterTreatment,
  setFilterTreatment,
  clearFilters,
}: MobileFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dentists, setDentists] = useState<Dentist[]>([])
  const [treatments, setTreatments] = useState<Treatment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loadFilterData = async () => {
      if (!isOpen) return // Only load when dropdown is opened

      setIsLoading(true)
      try {
        const [dentistsData, treatmentsData] = await Promise.all([
          dentistsClient.getAllDentists(),
          treatmentsClient.getAllTreatments(),
        ])

        setDentists(dentistsData)
        setTreatments(treatmentsData)
      } catch (error) {
        console.error("Failed to load filter data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadFilterData()
  }, [isOpen])

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between h-10 text-small-mobile font-medium text-dental-dark border-dental-secondary/50"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-dental-warm" />
            <span>Advanced Filters</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label className="text-small-mobile font-medium text-dental-dark">Appointment Date</Label>
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="h-10 text-small-mobile border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-small-mobile font-medium text-dental-dark">Dentist</Label>
          <Select value={filterDentist} onValueChange={setFilterDentist}>
            <SelectTrigger className="h-10 text-small-mobile border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0">
              <SelectValue placeholder={isLoading ? "Loading dentists..." : "All dentists"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dentists</SelectItem>
              {dentists.map((dentist) => (
                <SelectItem key={dentist.id} value={dentist.id}>
                  {dentist.name}
                </SelectItem>
              ))}
              {dentists.length === 0 && !isLoading && (
                <SelectItem value="" disabled>
                  No dentists available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-small-mobile font-medium text-dental-dark">Treatment</Label>
          <Select value={filterTreatment} onValueChange={setFilterTreatment}>
            <SelectTrigger className="h-10 text-small-mobile border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0">
              <SelectValue placeholder={isLoading ? "Loading treatments..." : "All treatments"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All treatments</SelectItem>
              {treatments.map((treatment) => (
                <SelectItem key={treatment.id} value={treatment.id}>
                  {treatment.name}
                </SelectItem>
              ))}
              {treatments.length === 0 && !isLoading && (
                <SelectItem value="" disabled>
                  No treatments available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full h-10 text-small-mobile dental-button-secondary"
        >
          Clear Filters
        </Button>
      </CollapsibleContent>
    </Collapsible>
  )
}
