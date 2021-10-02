import { useState, useEffect } from 'react'

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

export default function createStateHook<DataType>(
  initialValue: DataType,
): () => [DataType, (v: DataType) => void] {
  const subscriber = createSubscribable<DataType>()

  return () => {
    const [value, setValue] = useState<DataType>(initialValue)

    useEffect(() => subscriber.subscribe(setValue), [])

    return [
      value,
      (v: DataType) => {
        setValue(v)
        subscriber.publish(v)
      },
    ]
  }
}

export const useCounter = createStateHook(0)