import { forge } from "mathforge"

import { randomId } from "@/lib/supported-problems"
import { Question } from "@/components/question"
import { userActiveQuestions } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/session"

export default async function Page() {
  const user = (await getCurrentUser())!
  const userActiveQuestion = await userActiveQuestions.findOne({
    userId: user._id,
  })

  if (userActiveQuestion) {
    return (
      <Question
        problemId={userActiveQuestion.problemId}
        data={userActiveQuestion.data}
      />
    )
  }

  const randomQuestionId = randomId()
  const question = forge(randomQuestionId)

  await userActiveQuestions.replaceOne(
    { userId: user._id },
    {
      userId: user._id,
      createdAt: new Date(),
      problemId: randomQuestionId,
      data: question.data,
      answer: question.answer,
    },
    { upsert: true }
  )

  return <Question problemId={randomQuestionId} data={question.data} />
}
