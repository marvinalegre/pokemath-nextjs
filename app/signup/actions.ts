// app/signup/actions.ts
"use server"

import { redirect } from "next/navigation"

export type SignupState = {
  formErrors: string[]
  fieldErrors: {
    [fieldName: string]: string[]
  }
  message?: string
}

export async function signup(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  await sleep(2000)

  const username = formData.get("username")
  const password = formData.get("password")

  return {
    fieldErrors: { username: ["testing", "asdf"], password: ["testing"] },
    formErrors: [],
    message: "hello world",
  }

  redirect("/login")
}
