import fetch from 'node-fetch'
import { api } from '../Visitor/class'

async function* iterateResults<DataType>(url: string) {
  let nextUrl: string | undefined = url

  do {
    const response = await fetch(url)
    const json: {
      next?: string
      results: DataType[]
    } = await response.json()

    yield* json.results

    nextUrl = json.next
  } while (nextUrl)
}

interface Pokemon {
  name: string
  url: string
}

(async function () {
  for await (const result of iterateResults<Pokemon>(api)) {
    console.log(`name`, result.name)

    if (result.name === 'bulbasaur') {
      break
    }
  }
})()
