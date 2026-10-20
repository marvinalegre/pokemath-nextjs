import { forge } from "mathforge"
import { ObjectId } from "mongodb"
import { randomId } from "@/lib/supported-problems"
import { userActiveQuestions } from "@/lib/mongodb"

export async function replaceActiveQuestion(userId: ObjectId) {
  const randomQuestionId = randomId()
  const question = forge(randomQuestionId)

  await userActiveQuestions.replaceOne(
    { userId },
    {
      userId,
      createdAt: new Date(),
      problemId: randomQuestionId,
      data: question.data,
      answer: question.answer,
    },
    { upsert: true }
  )

  return {
    id: randomQuestionId,
    data: question.data,
  }
}

export async function getActiveQuestion(userId: ObjectId) {
  return await userActiveQuestions.findOne({ userId })
}
