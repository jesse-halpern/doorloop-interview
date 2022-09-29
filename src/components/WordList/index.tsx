import { Character, Word } from '../../types'
import styles from './styles.module.scss'
import { WordListProps } from './types'
import classNames from 'classnames'

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
  const hasValue = !!userText
  const className = classNames({
    word: true,
    hasValue,
    [styles.correct]: text === userText,
    incorrect:
      hasValue && userText !== text && text.indexOf(userText) !== 0
        ? true
        : false,
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
    letter: true,
    [styles.correct]: correct,
    [styles.incorrect]: !correct && userSymbol,
  })
  return (
    <span key={id} className={className}>
      {symbol}
    </span>
  )
}