"use server"

import { revalidatePath } from "next/cache"

export type CheckAnswerState = {
  message?: string
}

export async function checkAnswer(
  _prevState: CheckAnswerState,
  formData: FormData
): Promise<CheckAnswerState> {
  const answer = formData.get("answer")

  revalidatePath("/play")

  return { message: "correct" }
}
