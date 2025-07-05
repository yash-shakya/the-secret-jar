"use client"

import { SignupForm } from "@/components/signup-form"
import { GalleryVerticalEnd } from "lucide-react"

export default function Component() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 sm:gap-6 bg-muted p-4 sm:p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4 sm:gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium text-sm sm:text-base">
          <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-3 sm:size-4" />
          </div>
          The Secret Jar
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
