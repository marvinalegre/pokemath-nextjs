import { BinaryOperation } from "@/components/formatters/binary-operation"

export default async function Page() {
  return <BinaryOperation a={100000} b={1000} op="*" />
}
