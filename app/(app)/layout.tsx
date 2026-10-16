import { Navbar } from "@/components/navbar"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) redirect("/login")

  return (
    <>
      <Navbar username={user.username} />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </>
  )
}
