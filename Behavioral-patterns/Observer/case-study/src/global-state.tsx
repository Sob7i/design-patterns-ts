import { useEffect, useState } from "react"

export function createSubscribable<DataType>() {
  const subscribers: Set<(msg: DataType) => void> = new Set()

  return {
    subscribe(cb: (msg: DataType) => void) {
      subscribers.add(cb)
      return () => {
        subscribers.delete(cb)
      }
    },
    publish(msg: DataType) {
      subscribers.forEach((cb) => cb(msg))
    },
  }
}



export default function createGlobalStateHook<DataType>(
  initialValue: DataType,
): () => [DataType, (v: DataType) => void] {
  const subscribable = createSubscribable<DataType>()

  return () => {
    const [value, setValue] = useState<DataType>(initialValue)

    useEffect(() => subscribable.subscribe(setValue), [])

    return [
      value,
      (v: DataType) => {
        setValue(v)
        subscribable.publish(v)
      },
    ]
  }
}

export const useCounter = createGlobalStateHook(0)