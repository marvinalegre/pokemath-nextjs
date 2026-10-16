"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { signupSchema } from "@/lib/validations/signup"

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
  const username = formData.get("username")
  const password = formData.get("password")
  const result = signupSchema.safeParse({ username, password })

  if (!result.success) {
    return z.flattenError(result.error)
  }

  redirect("/login")
}
