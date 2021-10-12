import { readdirSync, readFileSync } from 'fs'

interface HandlerStack<DataType> {
  register(cb: (msg: DataType) => void): () => void
  notify(msg: DataType): unknown
}

function createHandlersStack<DataType>(): HandlerStack<DataType> {
  const handlers: Set<(msg: DataType) => undefined | unknown> = new Set()

  return {
    register(cb: (msg: DataType) => void): () => void {
      handlers.add(cb)

      return () => {
        handlers.delete(cb)
      }
    },
    notify(msg: DataType): unknown | undefined {
      let data: unknown

      for (const handler of Array.from(handlers)) {
        data = handler(msg)

        if (data !== undefined) {
          break
        }
      }

      return data
    },
  }
}

const handlers = createHandlersStack<{
  name: string
  content: string
}>()

handlers.register(({ name, content }) => {
  if (name.endsWith('.json')) {
    console.log('I got notified first')
    return JSON.parse(content)
  }
})

handlers.register(({ content }) => {
  console.log('I got notified second')
  return content
})

for (const name of readdirSync('./files', 'utf-8')) {
  const content = readFileSync(`./files/${name}`, 'utf-8')
  const output = handlers.notify({ name, content })

  console.log(`${name}: ${JSON.stringify(output)}`)
}
