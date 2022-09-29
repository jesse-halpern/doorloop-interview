import { useEffect, useState } from 'react'
import { ONE_MINUTE_MS, ONE_SECOND_MS } from '../utils'

export type UseTimerParams = {
  /**
   * The number of milliseconds to count down from
   */
  duration?: number
  /**
   * The rate at which to update the time remaining in milliseconds
   */
  interval?: number
}

const getInitialState = (
  duration: number
): { elapsed?: number; remaining?: number } => ({
  elapsed: 0,
  remaining: duration,
})

/**
 * Returns updated time information at a provided interval and duration
 * Does not begin until start() is called
 */
export function useTimer({
  interval = ONE_SECOND_MS,
  duration = ONE_MINUTE_MS,
}: UseTimerParams = {}) {
  const [startTime, setStartTime] = useState<number>()
  const [{ elapsed, remaining }, setTiming] = useState(
    getInitialState(duration)
  )
  useEffect(() => {
    if (startTime) {
      const id = setInterval(() => {
        const elapsed = Math.min(duration, Date.now() - startTime)
        setTiming({
          elapsed,
          remaining: elapsed ? duration - elapsed : duration,
        })
      }, interval / 2)
      return () => clearInterval(id)
    }
  }, [duration, elapsed, interval, remaining, startTime])

  return {
    elapsed,
    remaining,
    start: () => {
      if (!startTime) setStartTime(Date.now())
    },
    error:
      interval === 0 ? new Error('Interval must be greater than 0') : undefined,
  }
}
