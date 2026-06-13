import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import QueryProvider from "@/shared/providers/QueryProvider" // استيراد الـ Provider الذي بنيناه
import { Metadata } from "next"
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
import AbilityProvider from "@/shared/providers/AbilityProvider" // استيراد الـ Provider الجديد
const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})
export const metadata: Metadata = {
  title: "Logistic Management System",
  description: "Enterprise LMS for distribution and newspapers",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <QueryProvider>
          <AbilityProvider>
            <ThemeProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </ThemeProvider>
          </AbilityProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
