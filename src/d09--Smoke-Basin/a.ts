import fsInput from './input'

const fn = (input: string[]) => {
  const parsed = input.map(s => s.split('').map(Number))
  const risk = []

  for (let y = 0; y < parsed.length; y++) {
    for (let x = 0; x < parsed[y].length; x++) {
      if(
        (y===0 || (parsed[y-1][x] > parsed[y][x])) &&
        (y===parsed.length-1 || (parsed[y+1][x] > parsed[y][x])) &&
        (x===0 || (parsed[y][x-1] > parsed[y][x])) &&
        (x===parsed[y].length-1 || (parsed[y][x+1] > parsed[y][x]))
      ) {
        risk.push(parsed[y][x]+1)
      }
    }
  }
  return risk.reduce((acc,v) => acc+v, 0)
}
console.log(fn(fsInput))

export default fn
