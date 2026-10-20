import type { ProblemMap } from "mathforge"
import type { SupportedId } from "@/lib/supported-problems"
import {
  BinaryOperation,
  Operator,
} from "@/components/formatters/binary-operation"

type QuestionProps<K extends SupportedId> = {
  problemId: K
  data: ProblemMap[K]["data"]
}

export function Question<K extends SupportedId>({
  problemId,
  data,
}: QuestionProps<K>) {
  switch (problemId) {
    case "addition-single-digit-no-carry":
    case "addition-single-digit-carry":
    case "addition-single-double-digit-under-20":
    case "addition-double-digit-under-100":
    case "addition-two-digit-three-digit":
    case "addition-two-digit-four-digit":
    case "addition-four-digit-four-digit":
    case "addition-four-digit-five-digit":
    case "addition-four-digit-six-digit":
    case "subtraction-single-digit-no-borrow":
    case "subtraction-double-single-digit-under-20":
    case "subtraction-double-digit-under-100":
    case "subtraction-two-digit-three-digit":
    case "subtraction-two-digit-four-digit":
    case "subtraction-four-digit-four-digit":
    case "subtraction-four-digit-five-digit":
    case "subtraction-four-digit-six-digit":
    case "multiplication-by-2-3-4-5-10":
    case "multiplication-by-6-7-8-9":
    case "multiplication-product-up-to-1-million":
    case "division-by-2-3-4-5-10":
    case "division-by-6-7-8-9":
    case "division-3digit-by-1digit":
    case "division-4digit-by-2digit":
      let operation: Operator = "+"
      if (/^subtraction/.test(problemId)) {
        operation = "-"
      } else if (/^multiplication/.test(problemId)) {
        operation = "*"
      } else if (/^division/.test(problemId)) {
        operation = "/"
      }
      return <BinaryOperation a={data.a} b={data.b} op={operation} />
    default:
      return <p>unknown problem id</p>
  }
}
