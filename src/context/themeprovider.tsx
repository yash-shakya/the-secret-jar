"use client"

import * as React from "react"
import dynamic from "next/dynamic"
const NextThemesProvider = dynamic(
  () => import('next-themes').then(mod => mod.ThemeProvider),
  { ssr: false }
)
// import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}