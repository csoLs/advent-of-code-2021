import fsInput from './input'

const parseRow = (row: string) => {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/
  const [_str, id, x, y, width, height] = row.match(regex) ?? []

  return {
    id: parseInt(id,10),
    x: parseInt(x,10),
    y: parseInt(y,10),
    width: parseInt(width,10),
    height: parseInt(height,10),
  }
}

const generateMap = (input: {
  id: number
  x: number
  y: number
  width: number
  height: number
}[]): string[][] => {
  let x = 0
  let y = 0
  
  input.map(row => {
    if(row.x+row.width > x) x = row.x+row.width
    if(row.y+row.height > y) y = row.y+row.height
  })

  const map = Array.from({ length: y }, () => Array.from({ length: x }, () => '.'))
  return map
}

const countOverlap = (map:string[][]) => {
  return map.reduce((acc, row) => acc += row.filter(col => col === 'X').length, 0)
}

const fn = (input: string[]) => {
  const parsedMap = input.map(parseRow)
  const map = generateMap(parsedMap)
  
  parsedMap.map(row => {
    for (let y = row.y; y < row.y+row.height; y++) {
      for (let x = row.x; x < row.x+row.width; x++) {
        map[y][x] = map[y][x] === '.' ? row.id.toString() : 'X'
      }
    }
  })

  return countOverlap(map)
}
console.log(fn(fsInput))

export default fn
