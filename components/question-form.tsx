"use client"

import { LoaderCircle } from "lucide-react"
import { checkAnswer } from "@/app/(app)/play/actions"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useState } from "react"

export function QuestionForm() {
  const [state, formAction, pending] = useActionState(checkAnswer, {})
  const [answer, setAnswer] = useState("")

  return (
    <form action={formAction} className="mx-auto max-w-xs">
      <FieldGroup>
        <Field>
          <Input
            id="answer"
            name="answer"
            type="text"
            value={answer}
            disabled={pending}
            onChange={(e) => {
              setAnswer(e.target.value)
            }}
            className="border-2 bg-white"
          />
        </Field>
        <Button type="submit" disabled={pending} aria-busy={pending}>
          {pending && <LoaderCircle className="size-4 animate-spin" />}
          Submit
        </Button>
      </FieldGroup>
    </form>
  )
}
