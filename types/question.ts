import { ObjectId } from "mongodb"
import type { ProblemMap } from "mathforge"
import type { SupportedId } from "@/lib/supported-problems"
import { Grade } from "@/lib/catch"

type ActiveQuestion = {
  [K in SupportedId]: {
    problemId: K
    data: ProblemMap[K]["data"]
    answer: ProblemMap[K]["answer"]
  }
}[SupportedId]

export type UserActiveQuestion = {
  userId: ObjectId
  createdAt: Date
} & ActiveQuestion

export interface Question {
  _id: string
  rating: number
  gradeLevel: Grade
}
