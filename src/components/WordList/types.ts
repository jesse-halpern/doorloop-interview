import { PropsWithChildren } from 'react'
import { Word } from '../../types'

export type WordListProps = PropsWithChildren<{
  words: Word[]
}>
