import fsInput from './input'

import { addAndReduce, calculateMagnitude } from './a'

const createPairs = (input: string[]) => {
  const res = input.map((s) => input.map((s2) => [s,s2]).filter(s => s[0] !== s[1]))

  return res.reduce((acc, v) => [...acc, ...v], [])
}

const fn = (input: string[]) => {
  const pairsToCheck = createPairs(input)

  const magnitudes = pairsToCheck.map(s => calculateMagnitude(addAndReduce(s, false)))

  return magnitudes.sort((a,b) => b-a)[0]
}
console.log('res pt2:', fn(fsInput))

export default fn
