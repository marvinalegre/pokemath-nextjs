"use server"

import { getActiveQuestion, replaceActiveQuestion } from "@/lib/question"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { newRating } from "@/lib/rating"
import { pokemons, users, questions, userPokemons } from "@/lib/mongodb"
import { rollTier } from "@/lib/catch"
import { supportedPokemons } from "@/lib/supported-pokemons"

export type CheckAnswerState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string }

export async function checkAnswer(
  _prevState: CheckAnswerState,
  formData: FormData
): Promise<CheckAnswerState> {
  const answer = formData.get("answer")
  if (typeof answer !== "string") {
    return { status: "error", message: "Invalid answer" }
  }

  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const currentActiveQuestion = await getActiveQuestion(user._id)
  if (!currentActiveQuestion) redirect("/play")

  await replaceActiveQuestion(user._id)
  revalidatePath("/play")

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

    return { status: "success", message: "wrong" }
  }

  const tier = rollTier(question.gradeLevel)
  if (tier === 0) {
    return { status: "success", message: "got away" }
  }

  let caught
  do {
    ;[caught] = await pokemons
      .aggregate([{ $match: { tier } }, { $sample: { size: 1 } }])
      .toArray()
  } while (!supportedPokemons.includes(caught._id))

  await userPokemons.insertOne({
    ownderId: user._id,
    pokemonId: caught._id,
    caughtBy: user._id,
    caughtAt: new Date(),
  })
  return { status: "success", message: `${caught._id} ${caught.name}` }
}
