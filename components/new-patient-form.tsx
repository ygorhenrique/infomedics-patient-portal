"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, UserPlus, Upload, X, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DentalLogo } from "@/components/dental-logo"
import { NewPatientRequest, patientsClient } from "@/lib/api/clients/patientsClient"

export function NewPatientForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<NewPatientRequest>({
    fullName: "",
    address: "",
    photo: ""//null as File | null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await patientsClient.addPatient(formData)

    // Redirect back to patients list
    router.push("/")
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, photo:"" }) //photo: file })

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setFormData({ ...formData, photo: "" })//photo: null })
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
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
            Enter the patient's basic information to create a new record
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload Section */}
            <div className="space-y-4">
              <Label className="text-small font-medium text-dental-dark">Patient Photo</Label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  {photoPreview ? (
                    <div className="relative">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Patient preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-dental-secondary"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-dental-light border-2 border-dashed border-dental-secondary flex items-center justify-center">
                      <User className="h-8 w-8 text-dental-text-secondary" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="dental-button-secondary gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {photoPreview ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <p className="text-xs text-dental-text-secondary mt-1">Optional. JPG, PNG or GIF. Max 5MB.</p>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-small font-medium text-dental-dark">
                Full Name *
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Enter patient's full name"
                className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-small font-medium text-dental-dark">
                Address *
              </Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter patient's full address"
                className="border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0"
                rows={3}
                required
              />
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
