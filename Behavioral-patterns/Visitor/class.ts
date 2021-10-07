import fetch from 'node-fetch'

export const api = 'https://pokeapi.co/api/v2/pokemon/'

class VisitAllPages<DataType> {
  constructor(private baseUrl: string) {}

  async visit(visitor: (data: DataType[]) => void): Promise<void> {
    let next: string | undefined = this.baseUrl

    do {
      const response = await fetch(this.baseUrl)
      const json: {
        next?: string
        results: DataType[]
      } = await response.json()
      visitor(json.results)
      next = json.next
    } while (next)
  }
}

interface Pokemon {
  name: string
  url: string
}

const visitor = new VisitAllPages<Pokemon>(api)

// ! uncomment this line to run it 
// visitor.visit((results) => {
//   console.log(results)
// })
