import { notFound } from "next/navigation"
import { users, userPokemons } from "@/lib/mongodb"

type Props = {
  params: Promise<{ username: string }>
}

type CaughtView = {
  catchId: string
  name: string
  pokemonId: number
  caughtAt: Date
}

export default async function UserPage({ params }: Props) {
  const { username } = await params

  const user = await users.findOne({ username })
  if (!user) notFound()

  const caught = await userPokemons
    .aggregate<CaughtView>([
      { $match: { ownderId: user._id } },
      { $sort: { caughtAt: -1 } },
      {
        $lookup: {
          from: "pokemons",
          localField: "pokemonId",
          foreignField: "_id",
          as: "pokemon",
        },
      },
      { $unwind: "$pokemon" },
      {
        $project: {
          _id: 0,
          catchId: { $toString: "$_id" },
          name: "$pokemon.name",
          pokemonId: "$pokemon._id",
          caughtAt: 1,
        },
      },
    ])
    .toArray()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">{user.username}&apos;s Pokémon</h1>
      <p className="text-sm text-gray-500">{caught.length} caught</p>

      {caught.length === 0 ? (
        <p className="mt-6">No Pokémon caught yet.</p>
      ) : (
        <ul className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
          {caught.map((p) => (
            <li key={p.catchId} className="text-center">
              <img
                src={`/sprites/${String(p.pokemonId).padStart(4, "0")}.avif`}
                alt={p.name}
                width={150}
                height={150}
                className="mx-auto"
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
