export interface Pokemon {
  _id: number
}

export interface PokemonWithTier {
  _id: number
  name: string
  tier: number
}

export type CaughtPokemon = {
  id: string
  catchId: string
  name: string
}
