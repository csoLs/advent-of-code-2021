import fsInput from './input'

/*
Each die roll has the following chance of happening:
1                 2                 3
1     2     3     1     2     3     1     2     3
1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3 1 2 3
------------------------------------------------------
3 4 5 4 5 6 5 6 7 4 5 6 5 6 7 6 7 8 5 6 7 6 7 8 7 8 9

ie the total score of 3 dice are as follows:
3
444
555555
6666666
777777
888
9

*/
const DIRAC_DICE_ROLLS = [
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1],
]
const SCORE_TO_WIN = 21

const fn = (input: string[]) => {
  const playerPositions = input.map(s => parseInt(s.charAt(s.length-1),10)-1)
  const memo: [number, number][] = Array(44100)
  
  function diracGame(
    previousPlayerPosition: number, // [0, 9]
    otherPlayerPosition: number, // [0, 9]
    previousPlayerScore: number, // [0, 21)
    otherPlayerScore: number, // [0, 21)
  ): [number, number] {
    const key = 4410 * previousPlayerPosition + 441 * otherPlayerPosition + 21 * previousPlayerScore + otherPlayerScore
    if (memo[key]) {
      return memo[key]
    }

    let currentPlayerWins = 0, otherPlayerWins = 0
    for (const [roll, count] of DIRAC_DICE_ROLLS) {
      const currentPlayerPosition = (previousPlayerPosition + roll) % 10
      const currentPlayerScore = previousPlayerScore + currentPlayerPosition + 1

      if (currentPlayerScore >= SCORE_TO_WIN) {
        currentPlayerWins += count
        continue
      }

      const [additionalOtherPlayerWins,additionalCurrentPlayerWins] = diracGame(otherPlayerPosition,currentPlayerPosition,otherPlayerScore,currentPlayerScore)
      currentPlayerWins += count * additionalCurrentPlayerWins
      otherPlayerWins += count * additionalOtherPlayerWins
    }

    return memo[key] = [currentPlayerWins, otherPlayerWins]
  }

  return diracGame(playerPositions[0],playerPositions[1],0,0)  
}
console.log('RES pt B: ',fn(fsInput))

export default fn
