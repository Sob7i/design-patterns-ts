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
    this.subscribers.forEach(cb => cb(msg))
  }
}

const sub1 = new Subscribable<string>()
const unsub1 = sub1.subscribe(console.log)
sub1.subscribe(console.log)
sub1.publish("OOP: Hello wold!")
sub1.publish("OOP: Here is another msg")
unsub1()
sub1.publish("OOP: This msg's not gonna be published")

const sub2 = new Subscribable<number>()
const unsub2 = sub2.subscribe(console.log)
sub2.subscribe(console.log)
sub2.publish(3)
sub2.publish(7)
unsub2()
sub2.publish(10)


class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super()
  }

  setValue(v: number ) {
    this.value = v
    this.publish(v)
  }
}

const dc = new DataClass(0)
const unsubDc = dc.subscribe(console.log)
dc.setValue(5)
unsubDc()
dc.setValue(9)
