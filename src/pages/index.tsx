import WORD_BANK from '../data/word-bank.json'
import { ONE_MINUTE_MS, ONE_SECOND_MS, shuffle } from '../utils'
import GameContainer from '../components/GameContainer'

export async function getServerSideProps() {
  return {
    props: {
      duration: ONE_MINUTE_MS,
      interval: ONE_SECOND_MS,
      answers: shuffle(WORD_BANK),
    },
  }
}

export default GameContainer
