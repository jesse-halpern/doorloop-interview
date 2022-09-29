export * from './time'

export function noop() {}

export function shuffle<T>(items: T[], ordering = items.map(Math.random)) {
  return items
    .map((word, i) => ({ word, order: ordering[i] }))
    .sort((a, b) => a.order - b.order)
    .map(({ word }) => word)
}
