"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { mockDentists, mockTreatments } from "@/lib/mock-data"
import { Calendar, Plus } from "lucide-react"
import { appointmentsClient } from "@/lib/api/clients/appointmentsClient"
import { toast } from "@/hooks/use-toast"

interface AppointmentFormProps {
  patientId: string
  patientName: string
  onAppointmentCreated?: () => void
}

export function AppointmentForm({ patientId, patientName, onAppointmentCreated }: AppointmentFormProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    dentistId: "",
    treatmentId: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Combine date and time into appointmentDateTime format
      const appointmentDateTime = `${formData.date}T${formData.time}:00`

      const appointmentRequest = {
        patientId,
        dentistId: formData.dentistId,
        appointmentDateTime,
        treatmentId: formData.treatmentId,
      }

      await appointmentsClient.scheduleAppointment(appointmentRequest)

      toast({
        title: "Success",
        description: "Appointment scheduled successfully!",
      })

      // Reset form and close dialog
      setFormData({
        date: "",
        time: "",
        dentistId: "",
        treatmentId: "",
        notes: "",
      })
      setOpen(false)
      onAppointmentCreated?.()
    } catch (error) {
      console.error("Error scheduling appointment:", error)
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="dental-button-warm-bright gap-2 w-full">
          <Plus className="h-4 w-4" />
          Schedule Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-dental-dark">
            <Calendar className="h-5 w-5 dental-icon-warm" />
            Schedule Appointment
          </DialogTitle>
          <DialogDescription className="text-small text-dental-text-secondary">
            Create a new appointment for {patientName}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-small font-medium text-dental-dark">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-small font-medium text-dental-dark">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dentist" className="text-small font-medium text-dental-dark">
              Dentist
            </Label>
            <Select
              value={formData.dentistId}
              onValueChange={(value) => setFormData({ ...formData, dentistId: value })}
              disabled={isLoading}
            >
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select a dentist" />
              </SelectTrigger>
              <SelectContent>
                {mockDentists.map((dentist) => (
                  <SelectItem key={dentist.id} value={dentist.id}>
                    {dentist.name} - {dentist.specialization}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="treatment" className="text-small font-medium text-dental-dark">
              Treatment
            </Label>
            <Select
              value={formData.treatmentId}
              onValueChange={(value) => setFormData({ ...formData, treatmentId: value })}
              disabled={isLoading}
            >
              <SelectTrigger disabled={isLoading}>
                <SelectValue placeholder="Select a treatment" />
              </SelectTrigger>
              <SelectContent>
                {mockTreatments.map((treatment) => (
                  <SelectItem key={treatment.id} value={treatment.id}>
                    {treatment.name} ({treatment.duration} min) - ${treatment.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-small font-medium text-dental-dark">
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes for this appointment..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="dental-button-secondary">
              Cancel
            </Button>
            <Button type="submit" className="dental-button-warm-bright" disabled={isLoading}>
              {isLoading ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
