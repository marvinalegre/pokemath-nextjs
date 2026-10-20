import { forge } from "mathforge"

import { randomId } from "@/lib/supported-problems"
import { Question } from "@/components/question"

export default async function Page() {
  const randomQuestionId = randomId()
  const question = forge(randomQuestionId)

  return <Question problemId={randomQuestionId} data={question.data} />
}
