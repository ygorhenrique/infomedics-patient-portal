"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { patientsClient } from "@/lib/clients"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface NewPatientRequest {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  medicalHistory: string
  photo?: File | null
}

const NewPatientForm = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [address, setAddress] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")
  const [medicalHistory, setMedicalHistory] = useState("")
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null) // Clear any previous errors

    try {
      const patientRequest: NewPatientRequest = {
        fullName,
        email,
        phone,
        dateOfBirth,
        address,
        emergencyContact,
        medicalHistory,
        photo: photoFile,
      }

      await patientsClient.addPatient(patientRequest)

      toast({
        title: "Success",
        description: "Patient added successfully!",
      })

      // Redirect to main page instead of patient detail page
      router.push("/")
    } catch (error: any) {
      console.error(error)

      // Extract error message from the API response
      const errorMessage = error?.message || "Failed to add patient. Please try again."
      setError(errorMessage)

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Patient</CardTitle>
        <CardDescription>Enter the patient's information below.</CardDescription>
      </CardHeader>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <CardContent className="space-y-2">
        <div className="grid w-full gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input id="emergencyContact" value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="medicalHistory">Medical History</Label>
          <Textarea id="medicalHistory" value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)} />
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="photo">Photo</Label>
          <Input id="photo" type="file" onChange={(e: any) => setPhotoFile(e.target.files?.[0] || null)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default NewPatientForm
