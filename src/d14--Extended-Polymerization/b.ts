import fsInput from './input'

const parseInput = (input:string[]) => {
  const template = input[0].split('')
  const rules = new Map()
  
  input
    .filter((_,i)=>i>1)
    .map(s => {
      const [from,to] = s.split(' -> ')
      rules.set(from,to)
    })

  const pairs = new Map()
  for (let i = 0; i < template.length-1; i++) {
    const pair = `${template[i]}${template[i+1]}`
    if(!pairs.has(pair)) pairs.set(pair,1)
    else pairs.set(pair, pairs.get(pair)+1)
  }

  return {template, rules, pairs}
}

const calculateDelta = (map: Map<any,any>) => {
  let min = Number.MAX_SAFE_INTEGER
  let max = 0

  map.forEach(count => {
    min = Math.min(min, count)
    max = Math.max(max, count)
  })
  return max-min
}
const getCount = (pairCount: Map<any,any>, template: string[]) => {
  const letterCount = new Map()

  pairCount.forEach((count,pair) => {
    const [a,b] = pair.split('')
    if(!letterCount.has(a)) letterCount.set(a,0)
    if(!letterCount.has(b)) letterCount.set(b,0)

    letterCount.set(a, letterCount.get(a)+count)
    letterCount.set(b, letterCount.get(b)+count)
  })
  letterCount.set(template[0], letterCount.get(template[0]) + 1)
  letterCount.set(template[template.length-1], letterCount.get(template[template.length-1]) + 1)

  return letterCount
}
const fn = (input: string[]) => {
  const { template, pairs: parsedPairs, rules } = parseInput(input)

  let pairs = parsedPairs
  for (let i = 0; i < 40; i++) {
    const newPairs = new Map()
    
    pairs.forEach((count, pair) => {
      const rule = rules.get(pair)
      let [l,r] = pair.split('')
      l = l + rule
      r = rule + r

      if(!newPairs.has(l)) newPairs.set(l,0)
      if(!newPairs.has(r)) newPairs.set(r,0)

      newPairs.set(r, newPairs.get(r) + count)
      newPairs.set(l, newPairs.get(l) + count)
    })

    pairs = newPairs
  }  
  const letterCount = getCount(pairs, template)
  const delta = calculateDelta(letterCount)

  return delta/2
}
console.log(fn(fsInput))

export default fn
