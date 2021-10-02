/* The observer pattern in FP */

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set()

  return {
    subscribe(cb: (msg: MessageType) => void) {
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

const { subscribe, publish } = createSubscribable<string>()
const unsubFP1 = subscribe(console.log)
subscribe(console.log)
publish('FP: Hello wold!')
publish('FP: Here is another msg')
unsubFP1()
publish('FP: This msg is not gonna be published')

const subFP2 = createSubscribable<number>()
const unsubFP2 = subFP2.subscribe(console.log)
subFP2.subscribe(console.log)
subFP2.publish(1)
subFP2.publish(5)
unsubFP2()
subFP2.publish(10)
