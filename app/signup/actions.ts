"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { signupSchema } from "@/lib/validations/signup"
import { users } from "@/lib/mongodb"
import { hashPassword } from "@/lib/password"
import { reservedUsernames } from "@/lib/reserved-usernames"

export type SignupState = {
  formErrors: string[]
  fieldErrors: {
    [fieldName: string]: string[]
  }
  message?: string
}

export async function signup(
  _prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const rawUsername = formData.get("username")

  if (typeof rawUsername !== "string") {
    return {
      formErrors: [],
      fieldErrors: { username: ["Username must be a text value"] },
    }
  }

  const password = formData.get("password")
  const result = signupSchema.safeParse({ username: rawUsername, password })

  const fieldErrors: Record<string, string[]> = result.success
    ? {}
    : z.flattenError(result.error).fieldErrors

  const normalizedUsername = rawUsername.trim().toLowerCase()
  const user = await users.findOne({ username: normalizedUsername })
  if (
    !fieldErrors.username &&
    (user || reservedUsernames.includes(normalizedUsername))
  ) {
    fieldErrors.username = ["Username is not available"]
  }

  if (!result.success || fieldErrors.username) {
    return {
      formErrors: [],
      fieldErrors,
    }
  }

  const passwordHash = await hashPassword(result.data.password)
  try {
    await users.insertOne({
      username: normalizedUsername,
      passwordHash: passwordHash,
      createdAt: new Date(),
    })
  } catch (e) {
    console.error(e)

    return {
      formErrors: [],
      fieldErrors: {},
      message: "Something went wrong",
    }
  }

  redirect("/login")
}
