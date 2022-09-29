import { useEffect, useState } from 'react'
import { Character, Word } from '../types'
import { ONE_MINUTE_MS } from '../utils'

export type Score = {
  words: Word[]
  counts: {
    characters: { correct: number; incorrect: number }
    words: { correct: number; incorrect: number }
  }
  accuracy: {
    characters: number
    words: number
  }
  wpm: number
}
/**
 * Maintains a score object for the provided user input
 * Conntains both global averages as well as character-level accuracy counts
 */
export default function useScore(
  answers: string[],
  input: string,
  elapsed: number
): Score | undefined {
  const [score, setScore] = useState<Score>()
  useEffect(
    () => setScore(calculateScore(answers, input, elapsed)),
    [answers, elapsed, input]
  )

  return score
}

function calculateScore(answers: string[], input: string, elapsed: number) {
  // Ignore the word currently being typed
  // Final token is an empty string if last char is a space or newline
  const completedWords = input.split(' ')
  const wordModels = answers.map((word, wordIndex) => {
    const userWord = completedWords[wordIndex]
    // From the bottom up, Score individual characters first, then build word statistics
    const charModels: Character[] = word.split('').map((char, i) => ({
      id: `${char}-${i}`,
      symbol: char,
      userSymbol: userWord?.[i],
      correct: char === userWord?.[i],
    }))

    return {
      id: `${word}-${wordIndex}`,
      text: word,
      userText: userWord,
      characters: charModels,
      counts: {
        correct: charModels.reduce(
          (total, char, i) =>
            !!char.userSymbol && char.userSymbol === char.symbol
              ? ++total
              : total,
          0
        ),
        incorrect: charModels.reduce(
          (total, char, i) =>
            !!char.userSymbol && char.userSymbol !== char.symbol
              ? ++total
              : total,
          0
        ),
        unfinished: charModels.reduce(
          (total, char, i) => (!char.userSymbol ? ++total : total),
          0
        ),
      },
    }
  })
  const attemptedWords = wordModels.filter(({ userText }) => !!userText)
  const wordCounts = {
    correct: attemptedWords.reduce(
      (count, { userText, text }) => (text === userText ? ++count : count),
      0
    ),
    incorrect: attemptedWords.reduce(
      (count, { userText, text }) =>
        !text.startsWith(userText) ? ++count : count,
      0
    ),
  }
  const characterCounts = wordModels.reduce(
    ({ correct, incorrect }, word, index) => ({
      correct: correct + word.counts.correct,
      incorrect: incorrect + word.counts.incorrect,
    }),
    {
      correct: 0,
      incorrect: 0,
    }
  )
  const totalCorrect = wordCounts.correct
  return {
    words: wordModels,
    counts: {
      words: wordCounts,
      characters: characterCounts,
    },
    wpm: !totalCorrect ? 0 : (totalCorrect * ONE_MINUTE_MS) / elapsed,
    accuracy: {
      words: totalCorrect / (totalCorrect + wordCounts.incorrect),
      characters:
        characterCounts.correct /
        (characterCounts.correct + characterCounts.incorrect),
    },
  }
}
