import fetch from 'node-fetch'
import { api } from './class'

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

const visitApiPages = visit<Pokemon[]>(api, (results) => {
  console.log(results)
})

// ! uncomment this line to run it 
// console.log(`visitApiPages`, visitApiPages)