import fsInput from './input'

const SCORE_TO_WIN = 1000

const fn = (input: string[]) => {
  let players = input.map((s,i) => ({
    player: i+1,
    pos: parseInt(s.charAt(s.length-1),10),
    score: 0,
    playing: i===0,
  }))

  let diceRoll = 0
  let startLoopValue = 1

  while(players.every(({ score }) => score < SCORE_TO_WIN)) {
    for (let i = startLoopValue; i <= 100; i = i+3) {
      diceRoll = diceRoll+3
      let pos = i
      if(i === 100) {
        startLoopValue = 3
        pos = pos + 3
      } else if(i === 99) {
        startLoopValue = 2
        pos = pos + 101
      } else {
        startLoopValue = 1
        pos = 3*pos +3
      }

      players = players.map(p => {
        const moves = (p.pos+pos)%10
        return {
          ...p,
          playing: !p.playing,
          ...(p.playing ? {
            score: p.score + (moves === 0 ? 10 : moves),
            pos: (moves === 0 ? 10 : moves)
          }: {})
        }
      })

      if(players.find(p => p.score >= SCORE_TO_WIN)) {
        break
      }
    }
  }

  return (players.find(({ score }) => score < 1000)?.score ?? 1)* diceRoll
}
console.log('RES: ',fn(fsInput))

export default fn
