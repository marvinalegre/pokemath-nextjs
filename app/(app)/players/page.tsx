import { users } from "@/lib/mongodb"

export default async function Page() {
  const players = await users
    .find({}, { projection: { username: 1 } })
    .toArray()

  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Players</h1>

      <div className="flex flex-wrap gap-4">
        {players.map((p) => (
          <a href={`/${p.username}`}>
            <div className="rounded-lg border p-4">
              <p className="font-medium">{p.username}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
