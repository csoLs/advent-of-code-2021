import fsInput from './input'

const NUMBERS = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg',
}

const fn = (input: string[]) => {
  const uniqueSegmentLengths = [NUMBERS[1].length,NUMBERS[4].length,NUMBERS[7].length,NUMBERS[8].length]

  const res = input.map(i => i.split(' | ')[1].split(' '))
  const segments = res.reduce((acc, v) => [...acc, ...v.filter(v => uniqueSegmentLengths.includes(v.length))], [])
  return segments.length
}
console.log(fn(fsInput))

export default fn
