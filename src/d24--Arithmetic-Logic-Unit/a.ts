import fsInput from './input'

const rules = [
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

// if (w[3]  == w[2]-7) && 
//    (w[7]  == w[6]-4) && 
//    (w[9]  == w[8]-2) && 
//    (w[10] == w[5]-8) &&
//    (w[11] == w[4]+3) &&
//    (w[12] == w[1]+7) &&
//    (w[13] == w[0]+4)

const fn = (input: string[], part = 2) => {
  const terms: number[][] = []
  for (let i = 0; i < input.length; i += 18) {
    terms.push([4, 5, 15].map((j) => +input[i + j].split(' ')[2]))
  }

  const prevs: number[][] = []
  const digits = []

  for (const [i, [divideBy, constX, constY]] of Object.entries(terms)) {
    if (divideBy === 1) {
      prevs.push([parseInt(i,10), constY])
    } else {
      const [prevI, prevC] = prevs.pop() ?? [0,0]
      const complement = prevC + constX
      digits[prevI] = part === 1 ? Math.min(9, 9 - complement) : Math.max(1, 1 - complement)
      digits[parseInt(i,10)] = digits[prevI] + complement
    }
  }
  console.log(digits.join(''))

  return terms
}

// console.log(fn(fsInput))

export default fn
