import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DentalLogo } from "@/components/dental-logo"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-mobile-header sm:h-auto sm:py-6">
            <div className="flex items-center gap-3 sm:gap-6">
              <DentalLogo />
              <div className="border-l border-gray-200 pl-3 sm:pl-6 hidden sm:block">
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Mobile Title Skeleton */}
        <div className="sm:hidden mb-4">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-mobile-card-gap sm:gap-6 mb-6 sm:mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="dental-card p-4 sm:p-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent className="p-0">
                <Skeleton className="h-8 w-12 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters Skeleton */}
        <Card className="dental-card mb-6">
          <CardHeader className="bg-dental-light/50 rounded-t-xl p-4 sm:p-6">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <Skeleton className="h-10 w-full" />
            <div className="hidden md:grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Patient Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="dental-card h-full">
              <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 flex-1 p-4 sm:p-6 pt-0">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="pt-2 mt-auto">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
