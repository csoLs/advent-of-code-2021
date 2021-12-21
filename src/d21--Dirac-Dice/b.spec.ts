/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `Player 1 starting position: 4
Player 2 starting position: 8`.split('\n'),
  expected: [444356092776315, 341960390180808]
}]

describe('d21--Dirac-Dice b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
