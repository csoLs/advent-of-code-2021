/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `2199943210
3987894921
9856789892
8767896789
9899965678`.split('\n'),
  expected: 15
}]

describe('d09--Smoke-Basin a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
