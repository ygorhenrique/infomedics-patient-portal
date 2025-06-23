import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { PhotoData } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts PhotoData to a data URL that can be used in img src
 */
export function photoDataToDataUrl(photo: PhotoData): string {
  return `data:${photo.contentType};base64,${photo.base64}`
}

/**
 * Safely gets the photo URL from a patient's photo data
 */
export function getPatientPhotoUrl(photo?: PhotoData | null): string | null {
  if (!photo || !photo.base64) {
    return null
  }
  return photoDataToDataUrl(photo)
}
