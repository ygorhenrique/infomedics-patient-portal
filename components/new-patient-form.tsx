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
import { patientsClient } from "@/lib/api/clients/patientsClient"
import { NewPatientRequest } from "@/lib/api"

// Supported image types and max file size
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes

interface PhotoData {
  base64: string
  contentType: string
  fileName: string
}

export function NewPatientForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<NewPatientRequest>({
    fullName: "",
    address: "",
    photo: null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{
    fullName?: string
    address?: string
    photo?: string
  }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const newErrors: {
      fullName?: string
      address?: string
      photo?: string
    } = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setIsSubmitting(true)
      const newPatient = await patientsClient.addPatient(formData)

      // Redirect to the new patient's detail page using the ID from the response
      router.push("/")
    } catch (error) {
      console.error("Error creating patient:", error)
      // You might want to show an error toast here
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
    // Clear error when user types
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  const validateImageFile = (file: File): string | null => {
    // Check file type
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) {
      return `Unsupported file type. Please upload: ${SUPPORTED_IMAGE_TYPES.map((type) => type.split("/")[1].toUpperCase()).join(", ")}`
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    }

    return null
  }

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Clear previous photo error
    setErrors({ ...errors, photo: undefined })

    // Validate the file
    const validationError = validateImageFile(file)
    if (validationError) {
      setErrors({ ...errors, photo: validationError })
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      return
    }

    try {
      // Convert file to Base64 string with content type
      const photoData = await convertFileToPhotoData(file)
      setFormData({ ...formData, photo: photoData })

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error processing image:", error)
      setErrors({ ...errors, photo: "Failed to process image. Please try again." })
    }
  }

  const convertFileToPhotoData = (file: File): Promise<PhotoData> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          // Get the base64 string (remove the data:image/jpeg;base64, part)
          const base64String = reader.result.split(",")[1]
          resolve({
            base64: base64String,
            contentType: file.type,
            fileName: file.name,
          })
        } else {
          reject(new Error("Failed to convert file to Base64"))
        }
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const removePhoto = () => {
    setFormData({ ...formData, photo: null })
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    // Clear photo error if it exists
    if (errors.photo) {
      setErrors({ ...errors, photo: undefined })
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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
                  <p className="text-xs text-dental-text-secondary mt-1">
                    Optional. JPEG, PNG, GIF, or WebP. Max {MAX_FILE_SIZE / (1024 * 1024)}MB.
                  </p>
                  {formData.photo && (
                    <p className="text-xs text-dental-warm mt-1">
                      {formData.photo.contentType.split("/")[1].toUpperCase()} • {formData.photo.fileName}
                    </p>
                  )}
                  {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={SUPPORTED_IMAGE_TYPES.join(",")}
                onChange={handlePhotoChange}
                className="hidden"
              />
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
                className={`border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0 ${errors.fullName ? "border-red-500" : ""}`}
                required
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
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
                className={`border-dental-secondary/50 focus:border-dental-warm focus:ring-2 focus:ring-dental-warm/20 focus:ring-offset-0 ${errors.address ? "border-red-500" : ""}`}
                rows={3}
                required
              />
              {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="dental-button-warm-bright flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Creating...
                  </>
                ) : (
                  "Create Patient"
                )}
              </Button>
              <Link href="/">
                <Button type="button" variant="outline" className="dental-button-secondary" disabled={isSubmitting}>
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
