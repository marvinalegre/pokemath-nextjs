"use server"

import { getActiveQuestion, replaceActiveQuestion } from "@/lib/question"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export type CheckAnswerState = {
  message?: string
}

export async function checkAnswer(
  _prevState: CheckAnswerState,
  formData: FormData
): Promise<CheckAnswerState> {
  const answer = formData.get("answer")
  if (typeof answer !== "string") {
    return { message: "Invalid answer" }
  }

  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const currentActiveQuestion = await getActiveQuestion(user._id)
  if (!currentActiveQuestion) redirect("/play")
  if (String(currentActiveQuestion?.answer) === answer) {
    await replaceActiveQuestion(user._id)
  }

  revalidatePath("/play")

  return { message: "correct" }
}
