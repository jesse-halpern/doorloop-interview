import { Character, Word } from '../../types'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export type WordListProps = PropsWithChildren<{
  words: Word[]
}>

export default function WordList({ words }: WordListProps) {
  return (
    <ol className={styles.root}>
      {words.map((word) => (
        <Word key={word.id} {...word} />
      ))}
    </ol>
  )
}

function Word({ userText, text, characters, id }: Word) {
  const className = classNames({
    [styles.correct]: text === userText,
  })

  return (
    <li key={id} className={className}>
      {characters.map((char) => (
        <Letter key={char.id} {...char} />
      ))}
    </li>
  )
}

function Letter({ correct, userSymbol, id, symbol }: Character) {
  const className = classNames({
    [styles.correct]: correct,
    [styles.incorrect]: !correct && userSymbol,
  })
  return <span className={className}>{symbol}</span>
}
