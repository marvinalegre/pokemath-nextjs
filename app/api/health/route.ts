import { dbPromise } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const db = await dbPromise
    await db.command({ ping: 1 })

    return NextResponse.json({ connected: true })
  } catch {
    return NextResponse.json({ connected: false }, { status: 500 })
  }
}
