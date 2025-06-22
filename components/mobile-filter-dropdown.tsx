"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { mockDentists, mockTreatments } from "@/lib/mock-data"

interface MobileFilterDropdownProps {
  filterDate: string
  setFilterDate: (date: string) => void
  filterDentist: string
  setFilterDentist: (dentist: string) => void
  filterTreatment: string
  setFilterTreatment: (treatment: string) => void
  clearFilters: () => void
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
          <Label className="text-small-mobile font-medium text-dental-dark">Treatment</Label>
          <Select value={filterTreatment} onValueChange={setFilterTreatment}>
            <SelectTrigger className="h-10 text-small-mobile border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0">
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
