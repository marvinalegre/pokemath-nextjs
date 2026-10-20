import { MongoClient, MongoBulkWriteError } from "mongodb"
import { questionsWithInitialRatings } from "../lib/question-initial-ratings.ts"
import type { Question } from "../types/question.ts"

const uri = "mongodb://127.0.0.1:27017/pokemath"

async function main() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const questions = client.db().collection<Question>("questions")

    await questions.insertMany(questionsWithInitialRatings, { ordered: false })
    console.log(
      `Inserted ${questionsWithInitialRatings.length} questions with no duplicates.`
    )
  } catch (e) {
    if (!(e instanceof MongoBulkWriteError)) throw e

    const writeErrors = Array.isArray(e.writeErrors)
      ? e.writeErrors
      : [e.writeErrors]
    if (writeErrors.some((we) => we.code !== 11000)) throw e

    console.log(
      `Inserted ${e.insertedCount} questions; skipped ${writeErrors.length} duplicates.`
    )
  } finally {
    await client.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
