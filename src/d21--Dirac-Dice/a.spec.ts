/* eslint-env jest */

import fn from './a'

const testCases = [{
  name: 'basic',
  input: `Player 1 starting position: 4
Player 2 starting position: 8`.split('\n'),
  expected: 739785
}]

describe('d21--Dirac-Dice a', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
