import { useState } from 'react'
import { shuffle } from '../utils'

export default function useRandomOrder<T>(items: T[], ordering?: number[]) {
  const [randomized, setOrderedItems] = useState(shuffle(items, ordering))
  return {
    randomized,
    shuffle: () => setOrderedItems(shuffle(items, ordering)),
  }
}
