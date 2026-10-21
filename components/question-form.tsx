"use client"

import { LoaderCircle } from "lucide-react"
import { checkAnswer } from "@/app/(app)/play/actions"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export function QuestionForm() {
  const [state, formAction, pending] = useActionState(checkAnswer, {})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    if (state.message === "correct") {
      setIsDialogOpen(true)
    }
    setAnswer("")
  }, [state])

  return (
    <>
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
              className="h-auto border-2 bg-white text-xl md:h-auto md:text-xl"
            />
          </Field>
          <Button
            type="submit"
            disabled={pending}
            aria-busy={pending}
            className="h-auto py-1 text-xl md:h-auto md:py-1 md:text-xl"
          >
            {pending && <LoaderCircle className="size-4 animate-spin" />}
            Submit
          </Button>
        </FieldGroup>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Correct!</DialogTitle>
            <DialogDescription>
              Nice work. Here's your next question.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
