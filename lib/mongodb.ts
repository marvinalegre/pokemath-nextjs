import { MongoClient, Collection } from "mongodb"

import type { User } from "@/types/user"
import type { Session } from "@/types/session"

const globalForMongo = globalThis as unknown as {
  mongoClient?: Promise<MongoClient>
}

const clientPromise =
  globalForMongo.mongoClient ??
  (globalForMongo.mongoClient = new MongoClient(
    "mongodb://127.0.0.1:27017/pokemath"
  ).connect())

const db = (await clientPromise).db("pokemath")

export const users: Collection<User> = db.collection<User>("users")
export const sessions: Collection<Session> = db.collection<Session>("sessions")

await sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
