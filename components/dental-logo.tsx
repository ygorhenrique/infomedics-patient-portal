import { Stethoscope } from "lucide-react"

export function DentalLogo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="bg-dental-warm p-1.5 sm:p-2 rounded-lg shadow-md">
        <Stethoscope className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-sm sm:text-lg text-dental-dark">DentalCare</span>
        <span className="text-xs text-dental-text-secondary font-medium hidden sm:block">Practice Management</span>
      </div>
    </div>
  )
}
