import { Score } from '../../hooks/useScore'
import { formatTime } from '../../utils'
import styles from './styles.module.scss'

export default function Scorecard({
  accuracy,
  counts,
  wpm,
  remaining,
  duration,
}: Score & { remaining: number; duration: number }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Time Remaining</th>
          <th>WPM</th>
          <th>Character %</th>
          <th>Word #</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{formatTime(remaining ?? duration)}</td>
          <td>{wpm ? wpm.toFixed(2) : '-'}</td>
          <td>{accuracy.characters ? accuracy.characters.toFixed(2) : '-'}</td>
          <td>{counts.words.correct}</td>
        </tr>
      </tbody>
    </table>
  )
}
