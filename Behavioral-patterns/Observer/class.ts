/* The observer pattern in OOP */

class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set()

  subscribe(cb: (msg: MessageType) => void) {
    this.subscribers.add(cb)
    return () => {
      this.subscribers.delete(cb)
    }
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((cb) => cb(msg))
  }
}

const subscribableClass = new Subscribable<string>()

const subscriberOOP = (data: string) => console.log(`Custom subscriber ${data}`)

subscribableClass.subscribe(subscriberOOP)
subscribableClass.publish('OOP: Hello wold!')
subscribableClass.subscribe(subscriberOOP)() // Cleanup subscriber
subscribableClass.publish("OOP: This msg's not gonna be published")

// We can extend the Subscribable class
class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super()
  }

  setValue(v: number) {
    this.value = v
    this.publish(v)
  }
}

const dc = new DataClass(0)
const unsubDc = dc.subscribe(console.log)
dc.setValue(5)
unsubDc()
dc.setValue(9)
