import Head from 'next/head'
import { useState, useEffect } from 'react'
import useScore from '../../hooks/useScore'
import { useTimer } from '../../hooks/useTimer'
import Scorecard from '../ScoreCard'
import WordList from '../WordList'
import styles from './styles.module.scss'
import useFocusInput from '../../hooks/useFocus'

type GameContainerProps = {
  answers: string[]
  duration: number
  interval: number
}
export default function GameContainer({
  answers,
  duration,
  interval,
}: GameContainerProps) {
  const [input, setInput] = useState('')
  const {
    start,
    remaining,
    elapsed = 0,
  } = useTimer({
    duration,
    interval,
  })
  const score = useScore(answers, input, elapsed)

  useEffect(() => void (input && start()), [input, start])

  const focusRef = useFocusInput()

  return (
    <div className={styles.container}>
      <Head>
        <title>WordLoop</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>WordLoop</h1>

        {!!score && (
          <Scorecard
            {...score}
            remaining={remaining ?? duration}
            duration={duration}
          />
        )}
        <input
          ref={focusRef}
          disabled={!remaining}
          className={styles.input}
          onChange={({ target }) => setInput(target.value)}
        />

        {!!score && <WordList words={score.words} />}
      </main>
    </div>
  )
}
