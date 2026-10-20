import { Question } from "@/components/question"
import { userActiveQuestions } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/session"
import { QuestionForm } from "@/components/question-form"
import { replaceActiveQuestion } from "@/lib/question"

export default async function Page() {
  const user = (await getCurrentUser())!
  const userActiveQuestion = await userActiveQuestions.findOne({
    userId: user._id,
  })

  if (userActiveQuestion) {
    return (
      <>
        <Question
          problemId={userActiveQuestion.problemId}
          data={userActiveQuestion.data}
        />
        <QuestionForm />
      </>
    )
  }

  const newActiveQuestion = await replaceActiveQuestion(user._id)

  return (
    <>
      <Question
        problemId={newActiveQuestion.id}
        data={newActiveQuestion.data}
      />
    </>
  )
}
