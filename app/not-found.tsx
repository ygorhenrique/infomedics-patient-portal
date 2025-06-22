import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, AlertCircle } from "lucide-react"
import { DentalLogo } from "@/components/dental-logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="dental-card w-full max-w-md">
        <CardHeader className="text-center bg-dental-light/50 rounded-t-xl">
          <div className="flex justify-center mb-4">
            <DentalLogo />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="h-6 w-6 text-dental-warm" />
            <CardTitle className="text-2xl text-dental-dark">Page Not Found</CardTitle>
          </div>
          <CardDescription className="text-dental-text-secondary">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-6">
          <Link href="/">
            <Button className="dental-button-warm-bright gap-2">
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
