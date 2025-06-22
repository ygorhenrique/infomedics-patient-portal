"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DentalLogo } from "@/components/dental-logo"

export function NewPatientForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Creating patient:", formData)

    // Redirect back to patients list
    router.push("/")
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-2xl">
      <div className="mb-6">
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

      <Card className="dental-card">
        <CardHeader className="bg-dental-light/50 rounded-t-xl">
          <CardTitle className="flex items-center gap-2 text-dental-dark">
            <UserPlus className="h-5 w-5 dental-icon-warm" />
            Add New Patient
          </CardTitle>
          <CardDescription className="text-small text-dental-text-secondary">
            Enter the patient's information to create a new record
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-small font-medium text-dental-dark">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-small font-medium text-dental-dark">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-small font-medium text-dental-dark">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-small font-medium text-dental-dark">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-small font-medium text-dental-dark">
                Date of Birth *
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-small font-medium text-dental-dark">
                Address *
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-small font-medium text-dental-dark">
                  Emergency Contact *
                </Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-small font-medium text-dental-dark">
                  Emergency Phone *
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                  className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="dental-button-warm-bright flex-1">
                Create Patient
              </Button>
              <Link href="/">
                <Button type="button" variant="outline" className="dental-button-secondary">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
