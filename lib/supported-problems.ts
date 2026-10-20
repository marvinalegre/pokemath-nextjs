import type { ProblemId } from "mathforge"

export const supportedIds = [
  "addition-single-digit-no-carry",
  "addition-single-digit-carry",
  "addition-single-double-digit-under-20",
  "addition-double-digit-under-100",
  "addition-two-digit-three-digit",
  "addition-two-digit-four-digit",
  "addition-four-digit-four-digit",
  "addition-four-digit-five-digit",
  "addition-four-digit-six-digit",
  "subtraction-single-digit-no-borrow",
  "subtraction-double-single-digit-under-20",
  "subtraction-double-digit-under-100",
  "subtraction-two-digit-three-digit",
  "subtraction-two-digit-four-digit",
  "subtraction-four-digit-four-digit",
  "subtraction-four-digit-five-digit",
  "subtraction-four-digit-six-digit",
  "multiplication-by-2-3-4-5-10",
  "multiplication-by-6-7-8-9",
  "multiplication-product-up-to-1-million",
  "division-by-2-3-4-5-10",
  "division-by-6-7-8-9",
  "division-3digit-by-1digit",
  "division-4digit-by-2digit",
] as const satisfies readonly ProblemId[]

export type SupportedId = (typeof supportedIds)[number]

export function randomId(): SupportedId {
  return supportedIds[Math.floor(Math.random() * supportedIds.length)]
}
