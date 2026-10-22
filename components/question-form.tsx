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

type CaughtPokemon = {
  id: string
  name: string
}

export function QuestionForm() {
  const [state, formAction, pending] = useActionState(checkAnswer, {
    status: "idle",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [answer, setAnswer] = useState("")
  const [isLocked, setIsLocked] = useState(false)
  const [caughtPokemon, setCaughtPokemon] = useState<CaughtPokemon | null>(null)

  useEffect(() => {
    if (state.status === "success") {
      setIsDialogOpen(true)

      if (state.message !== "got away" && state.message !== "wrong") {
        const [id, name] = state.message.split(" ")
        setCaughtPokemon({
          id,
          name,
        })
      } else {
        setCaughtPokemon(null)
      }
    }
    setAnswer("")
  }, [state])

  useEffect(() => {
    if (state.status !== "success" || state.message !== "wrong") return

    setIsLocked(true)
    const timer = setTimeout(() => setIsLocked(false), 10_000)

    return () => clearTimeout(timer)
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
            disabled={pending || isLocked}
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
            <DialogTitle>
              {state.status === "success" && state.message === "wrong"
                ? "Wrong."
                : "Correct!"}
            </DialogTitle>
            {state.status === "success" && state.message !== "wrong" && (
              <DialogDescription>
                {caughtPokemon
                  ? "Nice work. You caught a new Pokémon!"
                  : "Aw! The Pokémon got away."}
              </DialogDescription>
            )}
            {state.status === "success" && state.message === "wrong" && (
              <DialogDescription>Try again 10 seconds.</DialogDescription>
            )}
          </DialogHeader>

          {caughtPokemon && (
            <div className="flex flex-col items-center gap-2 py-4">
              <img
                src={
                  caughtPokemon
                    ? `/sprites/${caughtPokemon.id.padStart(4, "0")}.avif`
                    : undefined
                }
                alt={caughtPokemon?.name}
                width={200}
                height={200}
              />
              <p className="font-semibold capitalize">{caughtPokemon?.name}</p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
