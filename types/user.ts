import { SupportedPokemon } from "@/lib/supported-pokemons"
import { ObjectId } from "mongodb"

export interface User {
  username: string
  passwordHash: string
  rating: number
  createdAt: Date
}

export interface UserPokemon {
  ownderId: ObjectId
  pokemonId: SupportedPokemon
  caughtBy: ObjectId
  caughtAt: Date
}
