import "server-only"
import { cookies } from "next/headers"
import { randomBytes } from "node:crypto"
import { ObjectId } from "mongodb"
import { cache } from "react"

import { sessions, users } from "@/lib/mongodb"

export async function createSession(userId: ObjectId) {
  const sessionId = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 7 * 86400000)

  await sessions.insertOne({
    _id: sessionId,
    userId,
    expiresAt,
  })

  const cookieStore = await cookies()

  cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })
}

export const getCurrentUser = cache(async () => {
  const sessionId = (await cookies()).get("session")?.value

  if (!sessionId) return null

  const session = await sessions.findOne({
    _id: sessionId,
    expiresAt: { $gt: new Date() },
  })

  if (!session) return null

  return users.findOne({ _id: session.userId })
})

export async function deleteSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value

  if (sessionId) {
    await sessions.deleteOne({ _id: sessionId })
  }

  cookieStore.delete("session")
}
