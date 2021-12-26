import fsInput from './input'

const _RULES = [
  { rule: 1,  pair: 14, constX: 14,   constY: 7,  divideBy: 1   },
  { rule: 2,  pair: 13, constX: 12,   constY: 4,  divideBy: 1   },
  { rule: 3,  pair: 4,  constX: 11,   constY: 8,  divideBy: 1   },
  { rule: 4,  pair: 3,  constX: -4,   constY: 1,  divideBy: 26  },
  { rule: 5,  pair: 12, constX: 10,   constY: 5,  divideBy: 1   },
  { rule: 6,  pair: 9,  constX: 10,   constY: 14, divideBy: 1   },
  { rule: 7,  pair: 8,  constX: 15,   constY: 12, divideBy: 1   },
  { rule: 8,  pair: 7,  constX: -9,   constY: 10, divideBy: 26  },
  { rule: 9,  pair: 6,  constX: -9,   constY: 5,  divideBy: 26  },
  { rule: 10, pair: 11, constX: 12,   constY: 7,  divideBy: 1   },
  { rule: 11, pair: 10, constX: -15,  constY: 6,  divideBy: 26  },
  { rule: 12, pair: 5,  constX: -7,   constY: 8,  divideBy: 26  },
  { rule: 13, pair: 2,  constX: -10,  constY: 4,  divideBy: 26  },
  { rule: 14, pair: 1,  constX: 0,    constY: 6,  divideBy: 26  },
]

const fn = (input: string[]) => {
  const terms: number[][] = []
  for (let i = 0; i < input.length; i += 18) {
    terms.push([4, 5, 15].map((j) => +input[i + j].split(' ')[2]))
  }

  const prevs: number[][] = []
  const smallestDigit: number[] = []
  const largestDigit: number[] = []

  terms.forEach(([divideBy, constX, constY], i) => {
    if (divideBy === 1) {
      prevs.push([i, constY])
    } else {
      const [pairIndex, pairConstY] = prevs.pop() ?? [0,0]
      const complement = pairConstY + constX

      largestDigit[pairIndex] = Math.min(9, 9 - complement)
      largestDigit[i] = largestDigit[pairIndex] + complement
      smallestDigit[pairIndex] = Math.max(1, 1 - complement)
      smallestDigit[i] = smallestDigit[pairIndex] + complement
    }
  })

  return [parseInt(smallestDigit.join(''),10), parseInt(largestDigit.join(''),10)]
}
console.log(fn(fsInput))

export default fn
