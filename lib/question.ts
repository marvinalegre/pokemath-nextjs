import { forge } from "mathforge"
import { ObjectId } from "mongodb"
import { userActiveQuestions, questions, users } from "@/lib/mongodb"

export async function replaceActiveQuestion(userId: ObjectId) {
  const user = await users.findOne({ _id: userId })
  if (!user) throw new Error("hit")

  const questionId = await getNextQuestionForUser(user.rating)
  const question = forge(questionId)

  await userActiveQuestions.replaceOne(
    { userId },
    {
      userId,
      createdAt: new Date(),
      problemId: questionId,
      data: question.data,
      answer: question.answer,
    },
    { upsert: true }
  )

  return {
    id: questionId,
    data: question.data,
  }
}

export async function getActiveQuestion(userId: ObjectId) {
  return await userActiveQuestions.findOne({ userId })
}

async function getNextQuestionForUser(userRating: number) {
  const [question] = await questions
    .aggregate([
      {
        $addFields: {
          ratingDifference: {
            $abs: {
              $subtract: ["$rating", userRating],
            },
          },
        },
      },
      { $sort: { ratingDifference: 1 } },
      { $limit: 1 },
      { $project: { _id: 1 } },
    ])
    .toArray()

  return question?._id
}
