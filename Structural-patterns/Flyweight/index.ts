import fetch from 'node-fetch'

const pokemonsApi = 'https://pokeapi.co/api/v2/pokemon/'

interface Pokemon {
  species: {
    name: string
    url: string
  }
}

interface PokemonList {
  count: number
  next: string
  previous?: string
  results: {
    name: string
    url: string
  }[]
}

function makeURLFlyweights<ReturnType>(urls: Record<string, string>) {
  const originalObject: Record<string, Promise<ReturnType>> = {}

  // The Proxy object enables you to create a proxy for another object,
  // which can intercept and redefine fundamental operations for that object.
  const handler = {
    get: (target: Record<string, Promise<ReturnType>>, name: string) => {
      console.log(`Fetching ${name}: ${urls[name]}`)

      if (!target[name]) {
        target[name] = fetch(urls[name]).then((res) => res.json())
      }

      return target[name]
    },
  }
  
  return new Proxy(originalObject, handler)
}

;(async () => {
  const pokemons = (await (await fetch(pokemonsApi)).json()) as PokemonList

  const urls: Record<string, string> = pokemons.results.reduce(
    (acc, { name, url }) => ({
      ...acc,
      [name]: url,
    }),
    {},
  )

  const flyweight = makeURLFlyweights<Pokemon>(urls)
  const bulbasaur = await flyweight.bulbasaur
  console.log(`bulbasaur`, bulbasaur.species)
})()
