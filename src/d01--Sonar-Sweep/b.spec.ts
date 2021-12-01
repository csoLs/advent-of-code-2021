/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ],
  expected: 5
}]

describe('d01--Sonar-Sweep b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
