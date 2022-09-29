export type Status = 'correct' | 'incorrect' | 'indeterminate'
export type Character = {
  id: string
  symbol: string
  userSymbol?: string
  correct?: boolean
}
export type Word = {
  id: string
  text: string
  userText: string
  // status: Status
  characters: Character[]
}
