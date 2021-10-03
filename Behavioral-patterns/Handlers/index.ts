import fs from 'fs'

function createHandlerStack<MessageType>() {
  const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set()

  return {
    subscribe(cb: (msg: MessageType) => void): () => undefined | unknown {
      subscribers.add(cb)
      return () => subscribers.delete(cb)
    },
    publish(msg: MessageType): undefined | unknown {
      let data: unknown
      for (const subscriber of Array.from(subscribers)) {
        data = subscriber(msg)
        if (data !== undefined) {
          break
        }
      }
      return data
    },
  }
}

const handlers = createHandlerStack<{
  name: string
  content: string
}>()

handlers.subscribe(({ name, content }) => {
  if (name.endsWith('.json')) {
    return JSON.parse(content)
  }
})

handlers.subscribe(({ content }) => content)

for (const name of fs.readdirSync('./files')) {
  const content = fs.readFileSync(`./files/${name}`, 'utf8')
  const output = handlers.publish({ name, content })

  console.log(`${name}: ${JSON.stringify(output)}`)
}

