import fsInput from './input'

const move = (_input: string[][]) => {
  let input = JSON.parse(JSON.stringify(_input))
  const newArray = JSON.parse(JSON.stringify(_input))
  let hasMoved = false

  // console.log('pre-move')
  // printMap(newArray)

  // Move east
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if(input[y][x] === '>') {
        const checkX = x+1 === input[y].length ? 0 : x+1

        if(input[y][checkX] === '.') {
          newArray[y][x] = '.'
          newArray[y][checkX] = '>'
          hasMoved = true
        }
      }
    }
  }

  input = JSON.parse(JSON.stringify(newArray))
  // console.log('mid-move')
  // printMap(newArray)

  // Move south
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if(input[y][x] === 'v') {
        const checkY = y+1 === input.length ? 0 : y+1

        if(input[checkY][x] === '.') {
          newArray[y][x] = '.'
          newArray[checkY][x] = 'v'
          hasMoved = true
        }
      }
    }
  }

  // console.log('post-move')
  // printMap(newArray)

  return [newArray, hasMoved]
}

const printMap = (map:string[][]) => console.log(map.map(s => s.join('')).join('\n'))

const fn = (input: string[]) => {
  let map = input.map(s => s.split(''))
  let moving = true
  let moveCount = 0

  // printMap(map)

  while(moving) {
    const [a,b] = move(map)
    map = a
    moving = b
    moveCount++
    // printMap(map)
    // console.log(moveCount, b)

    // if(moveCount > 1) moving = false
  }

  return moveCount
}
console.log('res', fn(fsInput))

export default fn
