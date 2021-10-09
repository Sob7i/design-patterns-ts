import fetch from 'node-fetch'

async function* iterateApiPages<DataType>(
  url: string,
): AsyncGenerator<DataType, void, undefined> {
  let nextUrl: string | null | undefined = url

  do {
    const response = await fetch(url)
    const json: {
      next?: string | null
      results: DataType[]
    } = await response.json()

    yield* json.results

    nextUrl = json.next
  } while (nextUrl)

  return
}

interface Pokemon {
  name: string
  url: string
}

(async function (): Promise<void> {
  for await (const result of iterateApiPages<Pokemon>(
    'https://pokeapi.co/api/v2/pokemon/',
  )) {
    console.log(`result`, result)

    if (result.name === 'charmeleon') {
      break
    }
  }
})()
