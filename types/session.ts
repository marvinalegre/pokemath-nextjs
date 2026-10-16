import { ObjectId } from "mongodb"

export interface Session {
  _id: string
  userId: ObjectId
  expiresAt: Date
}
