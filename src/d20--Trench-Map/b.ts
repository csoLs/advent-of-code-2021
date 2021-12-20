import fsInput from './input'

const countActive = (map: string[][]) => {
  return map.reduce((acc, v) => acc + v.filter(s => s === '#').length, 0)
}
const paintMap = (map: string[][]) => {
  console.log(map.map(s => s.join('')).join('\n'))
}

const convertToNumber = (char: string, allHashtags: boolean) => {
  if(allHashtags) {
    if (char === '.') return 0
    return 1
  } else {
    if (char === '#') return 1
    return 0
  }
}

const applyAlgo = (algo: string, map: string[][]) => {
  const newMap = JSON.parse(JSON.stringify(map)) // deept copy
  const allHashtags = map.every(s => s[0] === '#' && s[s.length-1] === '#') && map[0].every(s => s === '#') && map[map.length-1].every(s => s === '#')

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const lkupIndex = [
        ...(y === 0 ? allHashtags ? ['#','#','#']  : ['.','.','.'] : [map[y-1][x-1],map[y-1][x],map[y-1][x+1]]),
        map[y][x-1],
        map[y][x],
        map[y][x+1],
        ...(y === map.length-1 ? allHashtags ? ['#','#','#']  : ['.','.','.'] : [map[y+1][x-1],map[y+1][x],map[y+1][x+1]]),
      ]
      const binary = lkupIndex.map(s => convertToNumber(s, allHashtags)).join('')
      newMap[y][x] = algo.charAt(parseInt(binary,2))
    }
  }

  return newMap
}

const padMap = (map: string[][], applyNumber = 2, padWith = '.') => {
  const allOnes = map.every(s => s[0] === '.' && s[s.length-1] === '.') && map[0].every(s => s === '.') && map[map.length-1].every(s => s === '.')
  const allHashtags = map.every(s => s[0] === '#' && s[s.length-1] === '#') && map[0].every(s => s === '#') && map[map.length-1].every(s => s === '#')

  if(allOnes || allHashtags) {
    return map
  }

  const paddedMap = [
    ...Array.from({ length: applyNumber }, () => Array.from({ length: map[0].length + applyNumber*2 }, () => padWith)),
    ...map.map(s => ([
      ...Array.from({ length: applyNumber }, () => padWith),
      ...s,
      ...Array.from({ length: applyNumber }, () => padWith),
    ])),
    ...Array.from({ length: applyNumber }, () => Array.from({ length: map[0].length + applyNumber*2 }, () => padWith)),
  ]
  return paddedMap  
}

const fn = (input: string[]) => {
  const enhancer = input[0]
  const map = padMap(input.splice(2).map(s => s.split('')), 2)

  let tmpMap = map
  for (let i = 0; i < 50; i++) {
    tmpMap = applyAlgo(enhancer, padMap(tmpMap, 2))
  }
  paintMap(tmpMap)

  return countActive(tmpMap)

}
console.log(fn(fsInput))

export default fn
