import fsInput from './input'

const parseRow = (row:string) => {
  return row.split(' ').filter(s => s !== '').map(Number)
}

const parseGame = (input: string[]) => {
  const numbers = input.splice(0,2)[0].split(',').map(Number)
  const boards = []
  
  for (let i = 4; i  < input.length; i+=6) {
    const board = [
      parseRow(input[i-4]),
      parseRow(input[i-3]),
      parseRow(input[i-2]),
      parseRow(input[i-1]),
      parseRow(input[i]),
    ]
    boards.push(board)
  }

  return {numbers, boards}
}

const checkboard = (numbers: number[], board: number[][]) => {
  for (let i = 0; i < 5; i++) {
    if(
      //row
      board[i].every(n => numbers.includes(n)) ||
      //column
      [board[0][i],board[1][i],board[2][i],board[3][i],board[4][i]].every(n => numbers.includes(n))
    ) {
      return true
    }
  }
  return false
}

const calculateWinningBoard = (numbers: number[], board: number[][]) => {
  const flatBoard = board.reduce((acc, v) => [...acc, ...v], [])
  const unused = flatBoard.filter(n => !numbers.includes(n))
  const sumOfUnused = unused.reduce((acc, v) => acc+v, 0)
  return sumOfUnused*numbers[numbers.length-1]
}

const fn = (input: string[]) => {
  const { numbers, boards } = parseGame([...input])
  const mutatableBoards = [...boards]
  const boardScores: number[] = []

  for (let i = 5; i <= numbers.length; i++) {
    const winningNumbers = [...numbers].splice(0,i)
    
    mutatableBoards.map((b,i) => {
      if(checkboard(winningNumbers, b)){
        boardScores.push(calculateWinningBoard(winningNumbers, b))
        mutatableBoards.splice(i,1)
      }
    })
  }
  return boardScores[boardScores.length-1]
}
console.log(fn(fsInput))

export default fn
