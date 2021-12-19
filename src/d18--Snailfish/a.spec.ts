/* eslint-env jest */

import fn, { reduceNumber, addNumbers, addAndReduce } from './a'

const explodeCases = [
  {
    name: 'split A',
    input: `[[[[0,7],4],[15,[0,13]]],[1,1]]`,
    expected: `[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`
  },
  {
    name: 'split B',
    input: `[[[[[1,1],[2,2]],[3,3]],[4,4]],[5,5]]`,
    expected: `[[[[3,0],[5,3]],[4,4]],[5,5]]`
  },
  {
    name: 'explode A',
    input: `[[[[[9,8],1],2],3],4]`,
    expected: `[[[[0,9],2],3],4]`
  },
  {
    name: 'explode B',
    input: `[7,[6,[5,[4,[3,2]]]]]`,
    expected: `[7,[6,[5,[7,0]]]]`
  },
  {
    name: 'explode C',
    input: `[[6,[5,[4,[3,2]]]],1]`,
    expected: `[[6,[5,[7,0]]],3]`
  },
  {
    name: 'explode D',
    input: `[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]`,
    expected: `[[3,[2,[8,0]]],[9,[5,[7,0]]]]`
  },
  {
    name: 'explode E',
    input: `[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]`,
    expected: `[[3,[2,[8,0]]],[9,[5,[7,0]]]]`
  },
]

describe('d18--Snailfish A explode', () => {
  explodeCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(reduceNumber(JSON.parse(tc.input))).toEqual(tc.expected)
    })
  })
})

const addCase = [
  {
    name: 'add A',
    input: `[1,1]
[2,2]
[3,3]
[4,4]`.split('\n'),
    expected: `[[[[1,1],[2,2]],[3,3]],[4,4]]`
  },
]

describe('d18--Snailfish A add', () => {
  addCase.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(JSON.stringify(tc.input
                              .map(s => JSON.parse(s))
                              .reduce((acc, v) => addNumbers(acc,v))
                            )).toEqual(tc.expected)
    })
  })
})

const testCases = [
  {
    name: 'basic A',
    input: `[1,1]
[2,2]
[3,3]
[4,4]`.split('\n'),
    expected: `[[[[1,1],[2,2]],[3,3]],[4,4]]`
  },
  {
    name: 'basic B',
    input: `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`.split('\n'),
    expected: `[[[[3,0],[5,3]],[4,4]],[5,5]]`
  },
  {
    name: 'basic C',
    input: `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`.split('\n'),
    expected: `[[[[5,0],[7,4]],[5,5]],[6,6]]`
  },
  {
    name: 'basic D',
    input: `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`.split('\n'),
    expected: `[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]`
  },
  {
    name: 'basic E',
    input: `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`.split('\n'),
    expected: `[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]`
  },
]


describe('d18--Snailfish a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(addAndReduce(tc.input)).toEqual(tc.expected)
    })
  })
})


const mainCase = [
  {
    name: 'basic A',
    input: `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.split('\n'),
    expected: 4140
  }
]

describe('d18--Snailfish a', () => {
  mainCase.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
