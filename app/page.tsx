import { Button } from "@/components/ui/button"
import { ROUTES } from "@/config/routes"
import { redirect } from "next/navigation"

export default function Page() {
  return (
     redirect(ROUTES.DASHBOARD.HOME)
  )
}
