import { Stethoscope } from "lucide-react"

export function DentalLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-dental-warm p-2 rounded-lg shadow-md">
        <Stethoscope className="h-6 w-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-dental-dark">DentalCare</span>
        <span className="text-xs text-gray-500 font-medium">Practice Management</span>
      </div>
    </div>
  )
}
