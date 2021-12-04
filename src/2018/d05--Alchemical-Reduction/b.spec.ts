/* eslint-env jest */

import fn from './b'

const testCases = [{
  name: 'basic',
  input: `dabAcCaCBAcCcaDA`,
  expected: 4
}]

describe('d05--Alchemical-Reduction b', () => {
  testCases.forEach(tc => {
    it(`should handle ${tc.name} test`, () => {
      expect(fn(tc.input)).toEqual(tc.expected)
    })
  })
})
