export const ONE_SECOND_MS = 1000
export const ONE_MINUTE_MS = ONE_SECOND_MS * 60
export const ONE_HOUR_MS = ONE_MINUTE_MS * 60

export function padNumber(n: number) {
  return `${n < 10 ? '0' : ''}${n}`
}

export function formatTime(timeMs: number) {
  const seconds = Math.floor(timeMs / ONE_SECOND_MS) % 60
  const minutes = Math.floor(timeMs / ONE_MINUTE_MS)
  return `${minutes}:${padNumber(seconds)}`
}
