/* The observer pattern in FP */

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set()

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb)
      return () => {
        subscribers.delete(cb)
      }
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg))
    },
  }
}

const subscribableFunction = createSubscribable<string>()

const subscriberFP = (data: string) => console.log(`Custom subscriber ${data}`)

subscribableFunction.subscribe(subscriberFP)
subscribableFunction.publish('FP: Hello world!')
subscribableFunction.subscribe(subscriberFP)() // cleanup subscriber
subscribableFunction.publish('FP: This msg is not gonna be published')
