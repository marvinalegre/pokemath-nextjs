import { MongoClient, Collection } from "mongodb"

import type { User } from "@/types/user"

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
