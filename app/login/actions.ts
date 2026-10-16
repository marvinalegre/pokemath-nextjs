"use server"

import { redirect } from "next/navigation"

import { users } from "@/lib/mongodb"
import { signupSchema } from "@/lib/validations/signup"
import { verifyPassword } from "@/lib/password"

export type LoginState = {
  message?: string
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("username")
  const password = formData.get("password")

  const result = signupSchema.safeParse({ username, password })

  if (!result.success) {
    return {
      message: "Incorrect username or password",
    }
  }

  let user
  try {
    user = await users.findOne({
      username: result.data.username,
    })
  } catch (e) {
    console.error(e)

    return {
      message: "Something went wrong",
    }
  }

  if (!user || !verifyPassword(result.data.username, user.passwordHash)) {
    return {
      message: "Incorrect username or password",
    }
  }

  redirect("/")
}
