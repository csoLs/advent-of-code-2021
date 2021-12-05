import fsInput from './input'

const parseLine = (input:string): {x1:number,x2:number,y1:number,y2:number} => {
  const regex = /(\d+),(\d+) -> (\d+),(\d+)/
  const [_, x1,y1,x2,y2] = input.match(regex) ?? []

  return {x1:parseInt(x1??0,10),x2:parseInt(x2??0,10),y1:parseInt(y1??0,10),y2:parseInt(y2??0,10)}
}
const fn = (input: string[]) => {
  const parsedInput = input.map(parseLine)
  const straightLines = parsedInput.filter(i => i.x1 === i.x2 || i.y1 === i.y2) // only consider streight lines

  const [largestX, largestY] = straightLines.reduce(([accX,accY], v) => {
    return [Math.max(accX, v.x1, v.x2), Math.max(accY, v.y1, v.y2), ]
  }, [0,0])
  
  const map = Array.from({ length: largestY+1 }, () => Array.from({ length: largestX+1 }, () => 0))

  straightLines.map(line => {
    for (let y = Math.min(line.y1,line.y2); y <= Math.max(line.y1,line.y2); y++) {
      for (let x = Math.min(line.x1,line.x2); x <= Math.max(line.x1,line.x2); x++) {
        map[y][x]++
      }
    }
  })

  const res = map.reduce((acc, row) => acc + row.filter(col => col > 1).length, 0)
  
  return res
}
console.log(fn(fsInput))

export default fn
