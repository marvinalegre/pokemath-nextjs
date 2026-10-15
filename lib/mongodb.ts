import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://127.0.0.1:27017/pokemath")

const clientPromise = client.connect()

export const dbPromise = clientPromise.then(async (client) => {
  const db = client.db("pokemath")

  await db.collection("users").createIndex({ username: 1 }, { unique: true })

  return db
})
