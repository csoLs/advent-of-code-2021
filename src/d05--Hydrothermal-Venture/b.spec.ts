/* eslint-env jest */

import fn from './b'

const testCases = [
  {
    name: 'basic',
    input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.split('\n'),
    expected: 12
  },
  {
    name: 'horizontal and vertical',
    input: `1,1 -> 3,3
3,0 -> 3,3`.split('\n'),
    expected: 1
  },
  {
    name: '2 diagonal',
    input: `8,0 -> 0,8
    0,0 -> 8,8`.split('\n'),
    expected: 1
  },
  {
    name: '1 diagonal',
    input: `6,4 -> 2,0`.split('\n'),
    expected: 0
  },
]

describe('d05--Hydrothermal-Venture b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
