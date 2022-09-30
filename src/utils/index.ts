export * from './time'

export function shuffle<T>(items: T[], ordering = items.map(Math.random)) {
  return items
    .map((word, i) => ({ word, order: ordering[i] }))
    .sort((a, b) => a.order - b.order)
    .map(({ word }) => word)
}

type Reduced<T> = {
  [K in keyof T]: number
}
export function count<T, P extends { [key: string]: (val: T) => boolean }>(
  items: T[],
  preds: P
): Reduced<P> {
  return Object.entries(preds).reduce(
    (acc, [key, pred]) => ({
      ...acc,
      [key]: items.filter(pred).length,
    }),
    {} as Reduced<P>
  )
}
