import fetch from 'node-fetch'

async function visit<DataType>(
  baseUrl: string,
  visitor: (data: DataType[]) => void,
): Promise<void> {
  let next: string | undefined = baseUrl

  do {
    const response = await fetch(baseUrl)
    const json: {
      next?: string
      results: DataType[]
    } = await response.json()
    visitor(json.results)
    next = json.next
  } while (next)
}

interface Pokemon {
  name: string
  url: string
}

const visitApiPages = visit<Pokemon[]>(
  'https://pokeapi.co/api/v2/pokemon/',
  (results) => {
    console.log(results)
  },
)

console.log(`visitApiPages`, visitApiPages)
