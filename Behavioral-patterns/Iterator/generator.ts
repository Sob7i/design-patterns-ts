import fetch from 'node-fetch'

const api = 'https://pokeapi.co/api/v2/pokemon/'

async function* iterateApiPages<DataType>(
  url: string,
): AsyncGenerator<DataType, unknown, undefined> {
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

;(async function (): Promise<void> {
  /* Get each result at a time */
  const results = iterateApiPages<Pokemon>(api)

  const nextResult = (await results.next()).value
  const isDone = (await results.next()).done

  console.log(`nextResult`, nextResult)
  console.log(`isDone`, isDone)

  /* Or iterate through the results */
  for await (const result of iterateApiPages<Pokemon>(api)) {
    console.log(`result`, result)

    if (result.name === 'charmeleon') {
      break
    }
  }
})()
