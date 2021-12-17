/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.split('\n'),
  expected: 40
}]

describe('d15--Chiton a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
