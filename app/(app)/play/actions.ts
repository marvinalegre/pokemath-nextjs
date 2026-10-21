"use server"

import { getActiveQuestion, replaceActiveQuestion } from "@/lib/question"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { newRating } from "@/lib/rating"
import { users, questions } from "@/lib/mongodb"

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
  const question = await questions.findOne({
    _id: currentActiveQuestion.problemId,
  })
  if (!question) throw new Error("Unknown problem id")
  if (String(currentActiveQuestion?.answer) === answer) {
    await users.updateOne(
      { _id: user._id },
      { $set: { rating: newRating(user.rating, 1, question.rating) } }
    )
    await questions.updateOne(
      { _id: currentActiveQuestion.problemId },
      { $set: { rating: newRating(question.rating, 0, user.rating) } }
    )
  } else {
    await users.updateOne(
      { _id: user._id },
      { $set: { rating: newRating(user.rating, 0, question.rating) } }
    )
    await questions.updateOne(
      { _id: currentActiveQuestion.problemId },
      { $set: { rating: newRating(question.rating, 1, user.rating) } }
    )
  }

  await replaceActiveQuestion(user._id)
  revalidatePath("/play")
  return { message: "correct" }
}
