import input from '../2018/d05--Alchemical-Reduction/input'
import fsInput from './input'

const NUMBERS = {
  'abcefg': 0,
  'cf': 1,
  'acdeg': 2,
  'acdfg': 3,
  'bcdf': 4,
  'abdfg': 5,
  'abdefg': 6,
  'acf': 7,
  'abcdefg': 8,
  'abcdfg': 9,
}

const parseRow = (row: { input: string[], output: string[] }) => {
  const map = {
    a: ['a','b','c','d','e','f','g'],
    b: ['a','b','c','d','e','f','g'],
    c: ['a','b','c','d','e','f','g'],
    d: ['a','b','c','d','e','f','g'],
    e: ['a','b','c','d','e','f','g'],
    f: ['a','b','c','d','e','f','g'],
    g: ['a','b','c','d','e','f','g'],
  }

  const filterEasy = () => {
    row.input.map(s => {
      if(s.length === 2) {
        // this is a one
        map.a = map.a.filter(i => !s.split('').includes(i))
        map.b = map.b.filter(i => !s.split('').includes(i))
        map.d = map.d.filter(i => !s.split('').includes(i))
        map.e = map.e.filter(i => !s.split('').includes(i))
        map.g = map.g.filter(i => !s.split('').includes(i))
  
        map.c = map.c.filter(i => s.split('').includes(i))
        map.f = map.f.filter(i => s.split('').includes(i))
      }
      if(s.length === 4) {
        // this is a four
        map.a = map.a.filter(i => !s.split('').includes(i))
        map.e = map.e.filter(i => !s.split('').includes(i))
        map.g = map.g.filter(i => !s.split('').includes(i))
        
        map.b = map.b.filter(i => s.split('').includes(i))
        map.c = map.c.filter(i => s.split('').includes(i))
        map.d = map.d.filter(i => s.split('').includes(i))
        map.f = map.f.filter(i => s.split('').includes(i))
      }
      if(s.length === 3) {
        // this is a seven
        map.b = map.b.filter(i => !s.split('').includes(i))
        map.d = map.d.filter(i => !s.split('').includes(i))
        map.e = map.e.filter(i => !s.split('').includes(i))
        map.g = map.g.filter(i => !s.split('').includes(i))
        
        
        map.a = map.a.filter(i => s.split('').includes(i))
        map.c = map.c.filter(i => s.split('').includes(i))
        map.f = map.f.filter(i => s.split('').includes(i))
      }
      if(s.length === 7) {
        // this is a eight, but contains everything...
      }
    })
  }

  filterEasy()

  const parseRow = (str: string, _map: { a: string, b: string, c: string, d: string, e: string, f: string, g: string }) => {
    const parsedNr = str
      .split('')
      .map(i => {
        if(_map.a === i) return 'a'
        if(_map.b === i) return 'b'
        if(_map.c === i) return 'c'
        if(_map.d === i) return 'd'
        if(_map.e === i) return 'e'
        if(_map.f === i) return 'f'
        if(_map.g === i) return 'g'
      })
      .sort()
      .join('')
    return parsedNr in NUMBERS ? NUMBERS[parsedNr as keyof typeof NUMBERS] : undefined
  }

  for (let a = 0; a < map.a.length; a++) {
    for (let b = 0; b < map.b.length; b++) {
      for (let c = 0; c < map.c.length; c++) {
        for (let d = 0; d < map.d.length; d++) {
          for (let e = 0; e < map.e.length; e++) {
            for (let f = 0; f < map.f.length; f++) {
              for (let g = 0; g < map.g.length; g++) {
                const _map = {
                  a: map.a[a],
                  b: map.b[b],
                  c: map.c[c],
                  d: map.d[d],
                  e: map.e[e],
                  f: map.f[f],
                  g: map.g[g],
                }
                const t = row.input.every(s => {
                  const r = parseRow(s, _map)
                  return r !== undefined
                })

                if(t) {
                  return parseInt(row.output.map(s => parseRow(s, _map)).join(''),10)
                }
              }
            }
          }
        }
      }
    }
  }
  throw new Error()
}

const fn = (input: string[]) => {
  const res = input.map(i => {
    const [input, output] = i.split(' | ')

    return {
      input: input.split(' '),
      output: output.split(' '),
    }
  })

  return res.map(parseRow).reduce((acc, v) => acc + v, 0)
}
console.log(fn(fsInput))

export default fn
