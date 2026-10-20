import { BlockMath } from "react-katex"
import "katex/dist/katex.min.css"

type Operator = "+" | "-" | "*" | "/"

interface Operation {
  symbol: string
}

const OPERATIONS: Record<Operator, Operation> = {
  "+": { symbol: "+" },
  "-": { symbol: "-" },
  "*": { symbol: "\\times" },
  "/": { symbol: "\\div" },
}

interface BinaryOperationProps {
  a: number
  b: number
  op?: Operator
}

export function BinaryOperation({ a, b, op = "+" }: BinaryOperationProps) {
  const operation = OPERATIONS[op]

  if (!operation) {
    return <p>Unsupported operator: {op}</p>
  }

  const latex = `${a} ${operation.symbol} ${b} = \\\; \?`

  return (
    <div style={{ fontSize: "1.6em" }}>
      <BlockMath math={latex} />
    </div>
  )
}
